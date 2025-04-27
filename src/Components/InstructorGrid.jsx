

import InstructorCard from "./instructorCard";

export default function InstructorGrid({ educators }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 text-black">
            {educators.map((educator) => (
              
                <div>
                    <div className="w-full sm:w-80 md:w-64 bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex justify-center mt-4">
                            <img
                                src={educator.avatar}
                                alt="Instructor Avatar"
                                className="w-24 h-24 object-cover rounded-full border-2 border-blue-800"
                            />
                        </div>

                        <div className="text-center px-4 py-4">
                            <h3 className="text-xl font-semibold text-blue-900">{educator.name}</h3>
                            <p className="text-sm text-gray-600 mt-2"></p>

                            <div className="mt-4  h-15 overflow-hidden">
                            <h3 className="text-sm font-extralight text-blue-900">{educator.bio}</h3>

                               
                            </div>
                        </div>
                    </div>
                </div>
           ) )}
         </div>

    );
}
