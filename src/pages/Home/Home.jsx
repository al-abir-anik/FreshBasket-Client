import Banner from "./Banner";
import Featured from "./Featured";

const Home = () => {
  return (
    <div>
      <header>
        <Banner></Banner>
        <div className="w-full h-14 bg-[#2D2A6E] flex justify-center items-center">
          <p className="text-white">
            The perfect theme for{" "}
            <span className="font-medium uppercase text-[#96AE00]">
              Beginners
            </span>{" "}
            or{" "}
            <span className="font-medium uppercase text-[#96AE00]">
              Professionals
            </span>{" "}
            - Absolutely no coding knowledge required!
          </p>
        </div>
      </header>

      <main>
        {/* Featured Foods Section */}
        <section>
          <Featured></Featured>
        </section>

        <section>
          <div>
            {/* Community Impact Section */}
            <section className=" py-16">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
                  Our Community Impact
                </h2>
                <p className="text-center text-green-600 text-lg mb-12">
                  Making a difference in lives every day, thanks to your
                  support.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-4xl font-bold text-green-800">
                      10,000+
                    </h3>
                    <p className="text-green-600 mt-2">Meals Donated</p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-4xl font-bold text-green-800">
                      5,000+
                    </h3>
                    <p className="text-green-600 mt-2">Families Helped</p>
                  </div>
                  <div className="p-6 bg-white rounded-lg shadow-md">
                    <h3 className="text-4xl font-bold text-green-800">
                      1,000+
                    </h3>
                    <p className="text-green-600 mt-2">Volunteers Engaged</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Join the Movement Section */}
            <section className=" py-16">
              <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-yellow-800 mb-6">
                  Join the Movement
                </h2>
                <p className="text-yellow-600 text-lg mb-8">
                  Become a part of the FoodBridge family today and help us fight
                  hunger together.
                </p>
                <button className="bg-yellow-500 text-white px-8 py-3 rounded-lg shadow-md hover:bg-yellow-600 transition">
                  Get Involved
                </button>
              </div>
            </section>
          </div>
        </section>

        {/* Testimonial section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              What Our Users Say
            </h2>
            <p className="text-gray-600 text-lg mb-12">
              Hear from those whose lives we’ve touched through FoodBridge.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700 italic mb-4">
                  FoodBridge has truly changed the way we think about food
                  sharing. We’re able to reach those who need it most, and it
                  feels amazing being part of something this impactful.
                </p>
                <p className="font-semibold text-gray-800">John Doe</p>
                <p className="text-gray-600">Community Volunteer</p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700 italic mb-4">
                  As a recipient, FoodBridge has provided essential food during
                  some of the most difficult times in my life. The service is a
                  true blessing for me and my family.
                </p>
                <p className="font-semibold text-gray-800">Jane Smith</p>
                <p className="text-gray-600">Recipient</p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-700 italic mb-4">
                  Volunteering with FoodBridge has given me a chance to give
                  back to the community in a meaningful way. The organization is
                  truly making a difference.
                </p>
                <p className="font-semibold text-gray-800">Mark Thompson</p>
                <p className="text-gray-600">Volunteer</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
