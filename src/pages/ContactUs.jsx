const ContactUs = () => {
  return (
    <div className="w-5/6 lg:w-3/4 mx-auto my-24">
      <header className=" p-6 rounded-lg mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Looking For FoodBridge?
        </h1>
        <p className="text-gray-700 mt-3 text-lg">
          We'd love to hear from you! Whether it's feedback, suggestions, or
          questions.
        </p>
      </header>

      <div className="bg-base-100 px-4 md:px-16 py-10">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Contact Form */}
          <form className="bg-white shadow-sm rounded-2xl p-6 space-y-4">
            <div>
              <label className="label">
                <span className="label-text font-medium">Name</span>
              </label>
              <input
                type="text"
                placeholder="Your full name"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your email address"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-medium">Message</span>
              </label>
              <textarea
                className="textarea textarea-bordered w-full min-h-[120px]"
                placeholder="Write your message here..."
                required></textarea>
            </div>

            <button type="submit" className="btn w-full">
              Send Message
            </button>
          </form>

          {/* Contact Info / Map */}
          <div className="space-y-6">
            <div className="bg-base-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-700">
                Our Location
              </h2>
              <p className="text-gray-600 mt-2">
                123 Food Street, Taste City, Flavorland 45678
              </p>
            </div>

            <div className="bg-base-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-700">Email</h2>
              <p className="text-gray-600 mt-2">support@foodbridge.com</p>
            </div>

            <div className="bg-base-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-700">Phone</h2>
              <p className="text-gray-600 mt-2">+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
