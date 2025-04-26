// import AchievementCard from "./AchievementCard";
import AchievementBadge from "./AchievementBages";



export default function Achivements() {


           

              return (
                <section className="w-full pt-20">

                <div className="top-5 w-full bg-[#1e293b] py-10 flex flex-wrap justify-center">
                  <AchievementBadge type="bronze" />
                  <AchievementBadge type="silver" />
                  <AchievementBadge type="gold" />
                </div>
                </section>
              );
            }
            

    