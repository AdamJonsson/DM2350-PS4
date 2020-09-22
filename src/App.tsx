import React, { useEffect, useState } from "react";
import "./App.scss";
import * as SurveyService from "./services/SurveyService";
import Question from "./components/question/question";
import {
  Button,
  Card,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@material-ui/core";
import { Door } from "./models/Door";
import { DoorForm, SurveyForm } from "./models/SurveyForm";
import useWindowDimensions from "./hooks/useWindowDimensions";

function App() {
  const [doors, setDoors] = useState<Door[]>([]);
  const [showErrors, setShowErrors] = useState(false);
  const [doorAnswers, setDoorAnswers] = useState<any>({});

  const [age, setAge] = useState(0);
  const [soundFamiliarity, setSoundFamiliarity] = useState(0);
  const [gender, setGender] = useState("");
  const [comment, setComment] = useState("");

  const windowDimensions = useWindowDimensions();
  const [onMobile, setOnMobile] = useState(false);

  const [sent, setSent] = useState(false);

  useEffect(() => {
    setOnMobile(windowDimensions.width < 700);
  }, [windowDimensions.width]);

  useEffect(() => {
    setDoors(SurveyService.getDoorDataInRandomOrder());
  }, []);

  const checkAnswered = (id: number) => {
    return doorAnswers[id]
      ? doorAnswers[id].emotion && doorAnswers[id].confidence
      : false;
  };

  const sendSurvey = () => {
    if (document) {
      if (gender === "" || age === 0 || soundFamiliarity === 0) {
        document
          .getElementById(`intro`)!
          .scrollIntoView({ behavior: "smooth" });
        setShowErrors(true);
      } else {
        const unanswered = doors.find((door) => !checkAnswered(door.id));
        if (unanswered) {
          document
            .getElementById(`door_${unanswered.id}`)!
            .scrollIntoView({ behavior: "smooth" });
          setShowErrors(true);
        } else {
          const answers = Object.keys(doorAnswers)
            .map((k) => {
              return {
                ...doorAnswers[k],
                door: doors.find((door) => door.id === parseInt(k)),
              };
            })
            .map(({ door, emotion, confidence }) => {
              return new DoorForm(door, emotion, confidence);
            });
          const form = new SurveyForm(
            age,
            soundFamiliarity,
            gender,
            answers,
            comment
          );
          SurveyService.uploadSurveyToFirestore(form).then(() => setSent(true));
        }
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="main">
          {sent ? (
            <Card>
              <div className="content-padding">
                <h1>Thank you for your answer!</h1>
              </div>
            </Card>
          ) : (
            <>
              <Card>
                <div className="content-padding" id="intro">
                  <h1>Evaluation of Knocking Sounds</h1>
                  <p>
                    If possible, please use a desktop or laptop computer to fill
                    in this form.
                    <br />
                    Use headphones and try to limit other distractions and noise
                    in your environment. <br />
                    <br />
                    Every video plays sound, make sure you adjust your volume so
                    that you can hear it. Be careful not to turn the volume up
                    too loud.
                    <br />
                    <br />
                    Play the video shown before answering each question. You can
                    play it as many times as you want. Answer what emotion you
                    think the knock conveys.
                  </p>
                  <TextField
                    label="How old are you?"
                    type="number"
                    required
                    id="standard-basic"
                    error={showErrors && age === 0}
                    onBlur={(e) => setAge(parseInt(e.target.value))}
                  />
                  <br />
                  <FormControl className="form-control">
                    <InputLabel required id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={(e) => setGender(e.target.value as string)}
                      value={gender}
                      error={showErrors && gender === ""}
                    >
                      <MenuItem value={"male"}>Male</MenuItem>
                      <MenuItem value={"female"}>Female</MenuItem>
                      <MenuItem value={"non-binary"}>Non-binary</MenuItem>
                      <MenuItem value={"no-disclosure"}>
                        Don't want to disclose
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <br />
                  <p
                    className={
                      showErrors && soundFamiliarity === 0 ? "error-text" : ""
                    }
                  >
                    Do you have any prior experience working with sound
                    professionally or as a hobby? *
                  </p>
                  <div className="marks">
                    <div className="marks-details">
                      <FormLabel>1 - None</FormLabel>
                      <FormLabel>5 - A lot</FormLabel>
                    </div>
                    <Slider
                      className={soundFamiliarity === 0 ? "noAnswer" : ""}
                      onChangeCommitted={(e, value) =>
                        setSoundFamiliarity(value as number)
                      }
                      aria-labelledby="discrete-slider-custom"
                      step={null}
                      min={1}
                      max={5}
                      defaultValue={undefined}
                      marks={[
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
                      ]}
                    />
                  </div>
                  <br />
                </div>
              </Card>
              {doors.map((door) => (
                <Question
                  key={door.id}
                  onMobile={onMobile}
                  door={door}
                  answered={checkAnswered(door.id)}
                  showErrors={showErrors}
                  setEmotion={(emotion) =>
                    setDoorAnswers({
                      ...doorAnswers,
                      [door.id]: { ...doorAnswers[door.id], emotion },
                    })
                  }
                  setConfidence={(confidence) =>
                    setDoorAnswers({
                      ...doorAnswers,
                      [door.id]: { ...doorAnswers[door.id], confidence },
                    })
                  }
                />
              ))}
              <Card>
                <div className="content-padding">
                  <h2>What did you think of the survey?</h2>
                  <div style={{ display: "flex" }}>
                    <TextField
                      id="outlined-multiline-static"
                      multiline
                      rows={4}
                      placeholder="Write your thoughts"
                      variant="outlined"
                      onBlur={(e) => setComment(e.target.value)}
                    />
                  </div>
                </div>
              </Card>
              <br />
              <Button
                onClick={sendSurvey}
                variant="contained"
                color="primary"
                size="large"
              >
                Send
              </Button>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
