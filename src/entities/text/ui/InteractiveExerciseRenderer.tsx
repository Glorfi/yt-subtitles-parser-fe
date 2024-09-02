'use client';
import { shuffleArray } from '@/shared/lib/shufleArray';
import { BlockNoteEditor } from '@blocknote/core';
import { useBlockNoteEditor } from '@blocknote/react';
import {
  Input,
  Select,
  Button,
  border,
  Heading,
  OrderedList,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useState, ChangeEvent, useEffect } from 'react';

type Option = {
  value: string;
  isCorrect: boolean;
};

// Функция для разбора опций из строки
const parseOptions = (text: string): Option[] => {
  const arr = shuffleArray(text.split('/'));
  return arr.map((option: string) => {
    const trimmedOption = option.trim();
    const isCorrect =
      trimmedOption.startsWith('**') && trimmedOption.endsWith('**');
    const value = isCorrect
      ? trimmedOption.slice(2, -2) // Убираем символы ** вокруг правильного ответа
      : trimmedOption;
    return { value, isCorrect };
  });
};

// Функция для рендера текста с input или select
const renderTextWithInputsAndSelects = (
  text: string,
  inputValues: { [key: number]: string },
  handleChange: (index: number, value: string) => void,
  results: { [key: number]: boolean } | null,
  disabled: boolean
): JSX.Element[] => {
  const regex = /\[.*?\]/g;
  const paragraphs = text.split('\n\n');
  const listItemRegex = /^(\d+\.\s.*|[-*]\s.*)/gm;

  return paragraphs.map((paragraph, paragraphIndex) => {
    const listItems = paragraph.match(listItemRegex);
    if (listItems) {
      const isOrderedList = listItems[0].match(/^\d+\./);
      const ListComponent = isOrderedList ? OrderedList : UnorderedList;
      return (
        <ListComponent key={`list-${paragraphIndex}`}>
          {listItems.map((item, index) => {
            const content = item.replace(/^\d+\.\s|[-*]\s/, '');
            const parts = content.split(regex);
            const matches = content.match(regex);

            return (
              <ListItem key={`list-item-${paragraphIndex}-${index}`}>
                {parts.reduce<JSX.Element[]>((acc, part, idx) => {
                  acc.push(
                    <span key={`part-${paragraphIndex}-${index}-${idx}`}>
                      {part}
                    </span>
                  );

                  if (matches && idx < matches.length) {
                    const content = matches[idx].slice(1, -1).trim();
                    const isSelect = content.includes('/');
                    const borderColor =
                      results &&
                      results[paragraphIndex * 100 + idx] !== undefined
                        ? results[paragraphIndex * 100 + idx]
                          ? 'green'
                          : 'red'
                        : 'inherit';

                    if (isSelect) {
                      const options = parseOptions(content);
                      acc.push(
                        <Select
                          width={'fit-content'}
                          display={'inline-block'}
                          key={`select-${paragraphIndex}-${index}-${idx}`}
                          value={inputValues[paragraphIndex * 100 + idx] || ''}
                          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            handleChange(
                              paragraphIndex * 100 + idx,
                              e.target.value
                            )
                          }
                          borderColor={borderColor}
                          isDisabled={disabled}
                          _disabled={{ opacity: 1 }}
                        >
                          <option value={''}></option>
                          {options.map((option, idx) => (
                            <option key={idx} value={option.value}>
                              {option.value}
                            </option>
                          ))}
                        </Select>
                      );
                    } else {
                      acc.push(
                        <Input
                          key={`input-${paragraphIndex}-${index}-${idx}`}
                          size={'sm'}
                          variant={'outline'}
                          maxW={`calc(${content.length + 1}ch + 16px)`}
                          type="text"
                          value={inputValues[paragraphIndex * 100 + idx] || ''}
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange(
                              paragraphIndex * 100 + idx,
                              e.target.value
                            )
                          }
                          placeholder={content}
                          borderColor={borderColor}
                          isDisabled={disabled}
                          _disabled={{ opacity: 1 }}
                        />
                      );
                    }
                  }

                  return acc;
                }, [])}
              </ListItem>
            );
          })}
        </ListComponent>
      );
    }

    const parts = paragraph.split(regex);
    const matches = paragraph.match(regex);

    return (
      <div key={`paragraph-${paragraphIndex}`}>
        {parts.reduce<JSX.Element[]>((acc, part, index) => {
          acc.push(<span key={`text-${paragraphIndex}-${index}`}>{part}</span>);

          if (matches && index < matches.length) {
            const content = matches[index].slice(1, -1).trim();
            const isSelect = content.includes('/');
            const borderColor =
              results && results[paragraphIndex * 100 + index] !== undefined
                ? results[paragraphIndex * 100 + index]
                  ? 'green'
                  : 'red'
                : 'inherit';

            if (isSelect) {
              const options = parseOptions(content);
              acc.push(
                <Select
                  width={'fit-content'}
                  display={'inline-block'}
                  key={`select-${paragraphIndex}-${index}`}
                  value={inputValues[paragraphIndex * 100 + index] || ''}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    handleChange(paragraphIndex * 100 + index, e.target.value)
                  }
                  borderColor={borderColor}
                  isDisabled={disabled}
                  _disabled={{ opacity: 1 }}
                >
                  <option value={''}></option>
                  {options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.value}
                    </option>
                  ))}
                </Select>
              );
            } else {
              acc.push(
                <Input
                  key={`input-${paragraphIndex}-${index}`}
                  size={'sm'}
                  variant={'outline'}
                  maxW={`calc(${content.length + 1}ch + 16px)`}
                  type="text"
                  value={inputValues[paragraphIndex * 100 + index] || ''}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(paragraphIndex * 100 + index, e.target.value)
                  }
                  placeholder={content}
                  borderColor={borderColor}
                  isDisabled={disabled}
                  _disabled={{ opacity: 1 }}
                />
              );
            }
          }

          return acc;
        }, [])}
      </div>
    );
  });
};

interface InteractiveExerciseRendererProps {
  html: string;
}

export const InteractiveExerciseRenderer = (
  props: InteractiveExerciseRendererProps
): JSX.Element => {
  const { html } = props;

  const [text, setText] = useState<string>('');

  async function parsingProps() {
    const editor = BlockNoteEditor.create();
    const html = await editor.tryParseHTMLToBlocks(props.html);
    const text = await editor.blocksToMarkdownLossy(html);
    setText(text);
  }

  useEffect(() => {
    parsingProps();
  }, [props]);

  const [inputValues, setInputValues] = useState<{ [key: number]: string }>({});
  const [results, setResults] = useState<{ [key: number]: boolean } | null>(
    null
  );
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false); // Состояние дизейблинга

  const handleChange = (index: number, value: string) => {
    setInputValues({
      ...inputValues,
      [index]: value,
    });
  };

  const handleCheckAnswers = () => {
    const regex = /\[.*?\]/g;
    const paragraphs = text.split('\n\n'); // Разделяем текст на параграфы
    const newResults: { [key: number]: boolean } = {};
    let countCorrect = 0;

    paragraphs.forEach((paragraph, paragraphIndex) => {
      const matches = paragraph.match(regex);
      if (matches) {
        matches.forEach((match, index) => {
          const content = match.slice(1, -1).trim();
          const isSelect = content.includes('/');

          const key = paragraphIndex * 100 + index;
          if (isSelect) {
            const options = parseOptions(content);
            const correctOption = options.find((option) => option.isCorrect);
            newResults[key] = correctOption?.value === inputValues[key];
            if (newResults[key]) countCorrect++;
          } else {
            newResults[key] = content === inputValues[key];
            if (newResults[key]) countCorrect++;
          }
        });
      }
    });

    setResults(newResults);
    setCorrectCount(countCorrect);
    setDisabled(true); // Дизейблим все инпуты и селекты после проверки
  };

  const handleReset = () => {
    // setInputValues({});
    setResults(null);
    setCorrectCount(0);
    setDisabled(false); // Включаем инпуты и селекты снова
  };

  // Определяем общее количество ответов при первом рендере
  useEffect(() => {
    const regex = /\[.*?\]/g;
    const matches = text.match(regex);
    setTotalCount(matches ? matches.length : 0);
  }, [text]);

  return (
    <div>
      {renderTextWithInputsAndSelects(
        text,
        inputValues,
        handleChange,
        results,
        disabled
      )}
      <Button onClick={handleCheckAnswers} colorScheme="teal">
        Check Answers
      </Button>
      <Button onClick={handleReset} colorScheme="gray" ml={4}>
        Reset Checking
      </Button>
      <p>{`Correct answers: ${correctCount} out of ${totalCount}`}</p>
    </div>
  );
};
