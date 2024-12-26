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
            <section className="bg-green-100 py-16">
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
            <section className="bg-yellow-100 py-16">
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
      </main>
    </div>
  );
};

export default Home;
