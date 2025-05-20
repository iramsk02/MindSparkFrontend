import QuizCard from "./Quizcard";
import { useEffect, useState } from "react";

export default function QuizGrid({quiz}){

   

    return(<>
   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {quiz.map((qquiz)=>(<QuizCard category={qquiz.category} xpReward={qquiz.xpReward} id={qquiz._id}/>))}
       
    </div>
    </>)
}