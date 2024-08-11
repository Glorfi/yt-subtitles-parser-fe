'use client';
import { VideoPlayer } from '@/entities/video';
import { useGetSubtitlesMutation } from '@/features/subtitles/getSubtitles';
import { useSubToTextMutation } from '@/features/subtitles/transformToText';
import { getVideoID } from '@/shared';
import { TextEditor } from '@/widgets/text-editor';
import {
  Button,
  HStack,
  Input,
  InputGroup,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import validator from 'validator';

export const ParseVideoFormWidget = (): JSX.Element => {
  const [link, setLink] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<string>('');
  const [transcript, setTranscript] = useState<string>('');

  const [getSubs, subsResponse] = useGetSubtitlesMutation();
  const [transformToText, textResponse] = useSubToTextMutation();

  useEffect(() => {
    const videoId = getVideoID(link);
    if (videoId) {
      setIsValid(true);
      setVideoId(videoId);
    }
  }, [link]);

  useEffect(() => {
    if (subsResponse.data) {
      transformToText({ transcriptId: subsResponse.data._id });
    }
  }, [subsResponse]);

  useEffect(() => {
    if (textResponse.data) {
      setTranscript(textResponse.data.body);
    }
  }, [textResponse]);

  return (
    <>
      <VStack w={'600px'} m={'0 auto'}>
        <InputGroup mt={'32px'} gap={'8px'} w={'100%'}>
          <Input
            type="text"
            placeholder="https://www.youtube.com/watch?v=-DxcESkvcQo"
            onChange={(e) => setLink(e.target.value)}
            textOverflow={'ellipsis'}
          />
          <Button
            colorScheme="red"
            isDisabled={
              !isValid || textResponse.isLoading || subsResponse.isLoading
            }
            isLoading={subsResponse.isLoading}
            onClick={() => getSubs({ videoId })}
          >
            Get Transcript
          </Button>
        </InputGroup>
        {subsResponse.isLoading || textResponse.isLoading ? (
          <HStack>
            <Spinner color="red.500" size="sm" />
            <Text color={'gray.600'}>
              {subsResponse.isLoading
                ? 'Extracting video subtitles'
                : 'Transforming subtitles to text'}
            </Text>
          </HStack>
        ) : null}
        {textResponse.isSuccess && <VideoPlayer videoId={videoId} />}
      </VStack>

      {transcript && <TextEditor htmlString={transcript} />}
    </>
  );
};
