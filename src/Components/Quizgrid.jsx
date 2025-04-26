import QuizCard from "./Quizcard";
import { useEffect, useState } from "react";

export default function QuizGrid({quiz}){
    console.log("quiz grid",quiz)

   

    return(<>
    <div className="flex gap-10 flex-wrap">
        {quiz.map((qquiz)=>(<QuizCard category={qquiz.category} xpReward={qquiz.xpReward} id={qquiz._id}/>))}
       
    </div>
    </>)
}