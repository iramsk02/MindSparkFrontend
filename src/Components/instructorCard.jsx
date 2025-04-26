
export default function InstructorCard({avatar,name,Bio}) {
  console.log("name",name,avatar)
  return (
      <div className="w-full sm:w-80 md:w-64 bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-center mt-4">
              <img
                  src="src/assets/pexels-photo-21.webp"
                  alt="Instructor Avatar"
                  className="w-24 h-24 object-cover rounded-full border-2 border-blue-800"
              />
          </div>

          <div className="text-center px-4 py-4">
              <h3 className="text-xl font-semibold text-blue-900">{name}</h3>
              <p className="text-sm text-gray-600 mt-2"></p>

              <div className="mt-4">
                  <a
                      href="#"
                      className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-900 rounded-lg hover:bg-blue-800 transition"
                  >
                      View Profile
                  </a>
              </div>
          </div>
      </div>
  );
}
