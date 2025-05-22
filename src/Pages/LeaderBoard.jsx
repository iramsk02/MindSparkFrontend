import React, { useState, useEffect } from "react";
import { Menu, X, Search, Bell, User, Book, Award, Calendar, Activity, Zap, Medal, Crown, Trophy, Users, ListChecks } from "lucide-react";
import Logo from "../icons/Logo";
import Home from "../icons/Home";
import LoadingScreen from "./Loading";
import toast from "react-hot-toast";

// UserCard component with improved styling matching dashboard theme
const UserCard = ({ image, name, position, points }) => {
  // Define position-based styling
  const getPositionStyles = () => {
    if (position === 1) {
      return {
        containerClass: "h-70 z-30 scale-110 ",
        medalColor: "bg-yellow-400",
        icon: <Crown size={24} className="text-yellow-600" />,
        labelText: "Champion",
        gradient: "bg-gradient-to-b from-yellow-300 to-yellow-500"
      };
    } else if (position === 2) {
      return {
        containerClass: "h-66 z-20 scale-110 mt-4",
        medalColor: "bg-gray-300",
        icon: <Medal size={22} className="text-gray-600" />,
        labelText: "Runner-up",
        gradient: "bg-gradient-to-b from-gray-200 to-gray-400"
      };
    } else {
      return {
        containerClass: "h-62 z-20 scale-110 mt-8",
        medalColor: "bg-amber-700",
        icon: <Trophy size={20} className="text-amber-900" />,
        labelText: "Top 3",
        gradient: "bg-gradient-to-b from-amber-600 to-amber-800"
      };
    }
  };

  const styles = getPositionStyles();

  return (

    <div className={`relative bottom-0 flex flex-col  items-center ${styles.containerClass} transition-all duration-300 hover:scale-105`}>
      {/* Position indicator with animation */}
      <div className="absolute -top-4  flex items-center justify-center w-10 h-10 rounded-full shadow-lg border-2 border-white animate-pulse" style={{ animationDuration: '3s' }}>
        <div className={`w-full h-full rounded-full ${styles.gradient} flex items-center justify-center text-white font-bold`}>
          {position}
        </div>
      </div>

      {/* Profile image with decorative elements */}
      <div className="relative mb-3 mt-7">
        <div className="absolute inset-0 rounded-full bg-primary animate-pulse opacity-30" style={{ animationDuration: '2.5s' }}></div>
        <div className="relative">
          <img
            src={image || "/api/placeholder/100/100"}
            alt={name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white shadow-sm">
            {styles.icon}
          </div>
        </div>
      </div>

      {/* User info with card design */}
      <div className="w-full max-w-[180px]  mt-4 rounded-xl overflow-hidden shadow-md bg-white">
        <div className={`${styles.gradient} py-1 px-3 text-white text-xs font-medium text-center`}>
          {styles.labelText}
        </div>
        <div className="p-3 flex-col justify-between items-center  h-40">
          <h3 className="font-semibold text-gray-800 mb-1 truncate">{name}</h3>

          {/* XP display with progress indicator */}
          <div className="flex items-center justify-center gap-1 ">
            <Zap size={16} className="text-blue-600" />
            <span className="font-bold text-lg">{points}</span>
            <span className="text-xs text-gray-500">XP</span>
          </div>

          {/* Progress bar */}
          {/* <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${Math.min(100, points / 15)}%` }}
            ></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};



export default function LeaderBoard() {
  const [leaders, setLeaders] = useState([]);
  const [topPerformer, setTopPerformer] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboardView, setLeaderboardView] = useState("all"); // "all", "friends", "nearby"
  const [timeFrame, setTimeFrame] = useState("month"); // "week", "month", "allTime"

  // Get user data
  const token = localStorage.getItem("token");
  const avatar = localStorage.getItem("avatar");
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("user");

  // Find user rank
  const getUserRank = () => {
    const userIndex = leaders.findIndex(leader => leader.name === user.name);
    return userIndex !== -1 ? userIndex + 1 : "N/A";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch leaderboard data
        const res = await fetch("https://mindspark-backend.onrender.com/api/progress/leaderboard", {
          headers: { Authorization: token },
        });
        const data = await res.json();
        console.log(data)
        setLeaders(data.leaderboard);

        if (data.leaderboard.length > 0) {
          setTopPerformer(data.leaderboard[0].name);
        }

        // Fetch user profile
        const userRes = await fetch(`https://mindspark-backend.onrender.com/api/users/getProfile/${username}`, {
          headers: { Authorization: token },
        });
        const userData = await userRes.json();
        setUser(userData);
      } catch (error) {
        toast.error("Failed to fetch leaderboard data");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, username]);

  // Filter leaders based on search query
  const filteredLeaders = leaders.filter(leader =>
    leader.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-primary text-white shadow-md">
        <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Logo navigateto={"/StudentDashboard"} />
            <span className="font-bold text-xl">MindSpark</span>
          </div>

         

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-gray-300 text-md">
            <a href="/StudentDashboard" className="hover:text-white transition flex items-center gap-1">
              <Home size={18} />
              <span>Home</span>
            </a>
            <a href="/Quiz" className="hover:text-white transition flex items-center gap-1">
              <ListChecks size={18} />
              <span>Quiz</span>
            </a>

            {/* <div className="relative">
              <Bell size={20} className="cursor-pointer hover:text-white" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
            </div> */}
            <a href={role === "student" ? "/StudentProfile" : "/InstructorProfile"}>
              <img
                className="w-9 h-9 rounded-full border-2 border-blue-400 object-cover"
                src={avatar || "https://via.placeholder.com/42"}
                alt="Profile"
              />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Links */}
        {isOpen && (
          <div className="md:hidden px-6 pb-4 bg-primary text-gray-300 flex flex-col gap-4 text-md">
            {/* Mobile Search */}
            {/* <div className="relative mt-3">
              <input
                type="text"
                placeholder="Search users..."
                className="w-full py-2 px-4 pl-10 rounded-full bg-primary-dark text-white placeholder-gray-300 border border-gray-700 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-300" size={18} />
            </div> */}

            <a href="/StudentDashboard" className="hover:text-white transition flex items-center gap-2 py-2">
              <Home size={18} />
              <span>Home</span>
            </a>

            {/* <a href="/LeaderBoard" className="hover:text-white transition flex items-center gap-2 py-2 text-white">
              <Award size={18} />
              <span>Leaderboard</span>
            </a> */}

             <a href="/Quiz" className="hover:text-white transition flex items-center gap-2 py-2 text-white">
              <ListChecks size={18} />
              <span>Quiz</span>
            </a>
            <a href="/StudentProfile" className="hover:text-white transition flex items-center gap-2 py-2">
              <User size={18} />
              <span>Profile</span>
            </a>
            {/* <a href="/signout" className="hover:text-white transition flex items-center gap-2 py-2">
              <span>Sign Out</span>
            </a> */}
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-20 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        {/* Leaderboard Header */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-6 shadow-lg text-white mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                <Award size={28} />
                Leaderboard
              </h1>
              <p className="mt-2 text-sm md:text-base opacity-90">
                {topPerformer ? `${topPerformer} is leading the way!` : "Compete with others and climb the ranks!"}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <Trophy size={18} />
                  <span className="font-bold text-xl">{getUserRank()}</span>
                </div>
                <span className="text-xs">Your Rank</span>
              </div>
              <div className="h-10 w-px bg-blue-300 mx-2"></div>
              <div className="text-center">
                <div className="font-bold text-xl">{user.xp || 0}</div>
                <span className="text-xs">Your XP</span>
              </div>
              <div className="h-10 w-px bg-blue-300 mx-2"></div>
              <div className="text-center">
                <div className="font-bold text-xl">{user.streak?.current || 0}</div>
                <span className="text-xs">Day Streak</span>
              </div>
            </div>
          </div>
        </div>



        {/* Top 3 Performers */}
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Crown size={20} className="text-yellow-500" />
            Top Performers
          </h2>

          <div className="flex flex-wrap justify-center gap-6 mb-10 ">
            {leaders.slice(1, 2).map((leader, index) => (
              <UserCard
                key={index}
                name={leader.name}
                position={2}
                points={leader.xp}
                image={leader.avatar}
              />
            ))}

            {leaders.slice(0, 1).map((leader, index) => (
              <UserCard
                key={index}
                name={leader.name}
                position={1}
                points={leader.xp}
                image={leader.avatar}
              />
            ))}

            {leaders.slice(2, 3).map((leader, index) => (
              <UserCard
                key={index}
                name={leader.name}
                position={3}
                points={leader.xp}
                image={leader.avatar}
              />
            ))}
          </div>
        </div>


        {/* Your Position Card */}
        <div className="bg-blue-50 rounded-xl shadow-md p-4 border-l-4 border-blue-600 mb-10">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Your Position</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white font-bold">
                {getUserRank()}
              </div>
              <img
                src={avatar || "/api/placeholder/40/40"}
                alt="Your avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <h4 className="font-medium">{user.name || "You"}</h4>
                <p className="text-sm text-gray-500">Keep going! 🚀</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Zap size={18} className="text-blue-600" />
              <span className="font-bold text-xl">{user.xp || 0}</span>
              <span className="text-sm text-gray-500">XP</span>
            </div>
          </div>

          {/* Next rank progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress to next rank</span>
              <span>
                {leaders[getUserRank()]
                  ? `${leaders[getUserRank() - 2]?.xp - (user.xp || 0)} XP to catch up`
                  : "Keep earning XP!"}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: leaders[getUserRank() - 2] && user.xp
                    ? `${Math.min(100, ((user.xp) / leaders[getUserRank() - 2]?.xp) * 100)}%`
                    : "10%"
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Leaderboard List */}
        <main className="pt-5 max-w-4xl mx-auto px-4">
    

          <div className="bg-white p-4 rounded-xl shadow-md">
            {filteredLeaders.map((leader, index) => (
              <RankingRow
                key={index}
                image={leader.avatar}
                name={leader.name}
                position={index + 1}
                points={leader.points}
                xp={leader.xp}
              />
            ))}
          </div>
        </main>
        


      </div>
    </div>
  );
}









const RankingRow = ({ image, name, position, points,xp }) => {
  const getBadgeStyle = () => {
    if (position === 1) return "bg-yellow-400 text-yellow-800";
    else if (position === 2) return "bg-gray-300 text-gray-700";
    else if (position === 3) return "bg-amber-700 text-white";
    else return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="flex items-center justify-center p-3 rounded-lg hover:bg-blue-50 transition-colors duration-300 mb-1 group">
      <div className="flex items-center justify-between flex-grow overflow-hidden">
        <div className="relative">
          <div>
            <img
              src={image || "/api/placeholder/46/46"}
              alt={name}
              className="w-11 h-11 rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-300 transition-colors duration-300"
            />
            {position <= 3 && (
              <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5 shadow-sm">
                {position === 1 ? <Crown size={14} className="text-yellow-500" /> :
                  position === 2 ? <Medal size={14} className="text-gray-500" /> :
                    <Trophy size={14} className="text-amber-700" />}
              </div>
            )}
          </div>
        </div>

        <div className="ml-3 font-medium text-gray-800 truncate">{name}</div>
        <div className="flex items-center">
          <Zap size={16} className="text-blue-600 mr-1" />
          <span className="font-bold text-gray-800">{points}</span>
          <span className="text-xs text-gray-500 ml-1">{xp}XP</span>
        </div>
      </div>
    </div>
  );
};

