import { ArrowRightIcon } from '@heroicons/react/24/solid';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Navigation */}
      <header className="flex items-center justify-between px-8 py-4">
        <div className="text-2xl font-bold">Lotvu</div>
        <nav className="space-x-4">
          <a href="#features" className="hover:underline">Features</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-8 py-20 bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-5xl font-extrabold mb-4">Discover Smart Property Investment with Lotvu</h1>
        <p className="text-lg mb-8">Leverage AI and comprehensive data insights to make informed investment decisions.</p>
        <a href="#features" className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
          Get Started
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-2xl font-bold mb-2">AI Insights</h3>
            <p>Utilize advanced AI algorithms to analyze property data and provide actionable insights.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-2xl font-bold mb-2">Comprehensive Data</h3>
            <p>Access extensive datasets including Zoopla and Land Registry data for informed decision-making.</p>
          </div>
          <div className="p-6 bg-white shadow rounded-lg">
            <h3 className="text-2xl font-bold mb-2">User-Friendly Interface</h3>
            <p>Experience a sleek and intuitive interface designed to enhance your investment workflow.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="px-8 py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12">About Lotvu</h2>
        <p className="max-w-3xl mx-auto text-center">Lotvu is a cutting-edge property investment tool that integrates AI and comprehensive data to provide investors with unparalleled insights and analytics. Our mission is to empower investors with the knowledge and tools they need to make smart property investment decisions.</p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
        <form className="max-w-xl mx-auto space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" id="email" className="mt-1 p-2 w-full border rounded-md" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" rows={4} className="mt-1 p-2 w-full border rounded-md"></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="px-8 py-4 bg-gray-800 text-white text-center">
        <p>&copy; 2024 Lotvu. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
