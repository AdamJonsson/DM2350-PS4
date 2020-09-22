import React, { useEffect, FC, useState } from "react";
import * as SurveyService from "./services/SurveyService";

export const SurveyDataPage: FC = () => {

    const [surveyData, setSurveyData] = useState<any>({});
    
    useEffect(() => {
        SurveyService.getSurveyAnswers().then(data => setSurveyData(data));
    }, [])

    return (
        <div>
            <pre>
                {JSON.stringify(surveyData, null, 2)}
            </pre>
        </div>
    )
}
