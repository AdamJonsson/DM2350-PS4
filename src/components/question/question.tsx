import {
  Card,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Slider,
} from "@material-ui/core";
import React, { FC, useEffect, useState } from "react";
import YouTube from "react-youtube";
import "./question.scss";
import { shuffle } from "../../services/SurveyService";
import { Door } from "../../models/Door";

interface QuestionProps {
  door: Door;
  answered: boolean;
  setEmotion: (percept: string) => void;
  setConfidence: (percept: number) => void;
  showErrors?: boolean;
  onMobile: boolean;
}

const Question: FC<QuestionProps> = (props) => {
  const [emotions, setEmotions] = useState<string[]>([]);
  const [confidence, setConfidence] = useState<number | undefined>();

  const displayError = () => {
    return props.showErrors && !props.answered;
  };

  const handleConfidence = (value: number) => {
    setConfidence(value);
    props.setConfidence(value);
  };

  useEffect(() => {
    const emotionValues = ["Anger", "Happiness", "Sadness", "Fear", "Neutral"];
    shuffle(emotionValues);
    setEmotions(emotionValues);
  }, []);

  const marks = [
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
  ];

  return (
    <div
      className={`question-container ${confidence ? "" : "noAnswer"} ${
        displayError() ? "error" : ""
      }`}
      id={`door_${props.door.id}`}
    >
      <Card raised={!props.answered}>
        <YouTube
          videoId={props.door.youtubeURL.replace("https://youtu.be/", "")}
          opts={{
            width: props.onMobile ? "100%" : "640",
            playerVars: { rel: 1, showinfo: 0 },
          }}
        />
        <div className="controls">
          <h3>What emotion does this knock convey?</h3>
          <RadioGroup onChange={(e) => props.setEmotion(e.target.value)}>
            {emotions.map((emotion) => (
              <FormControlLabel
			  	key={emotion}
                value={emotion}
                label={emotion}
                control={<Radio />}
              />
            ))}
          </RadioGroup>
          <h3>How confident are you in your answer?</h3>
          <div className="marks">
            <div className="marks-details">
              <FormLabel>1 - Not confident</FormLabel>
              <FormLabel>5 - Very confident</FormLabel>
            </div>
            <Slider
              onChangeCommitted={(e, value) => handleConfidence(value as number)}
              aria-labelledby="discrete-slider-custom"
              step={null}
              min={1}
              max={5}
              defaultValue={undefined}
              marks={marks}
            />
          </div>
        </div>
      </Card>
      {displayError() && <div className="error-text">Don't forget to answer me!</div>}
    </div>
  );
};

export default Question;
