import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight } from 'lucide-react';

export default function App() {
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [submissionStatus, setSubmissionStatus] = useState('');

  useEffect(() => {
    const targetDate = new Date('2024-12-31T00:00:00');

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Handle email submission here
    try {
      const response = await fetch('https://formspree.io/f/movqeoye', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmissionStatus('Thank you for subscribing!');
        setEmail('');
      } else {
        setSubmissionStatus('Oops! There was a problem with your submission.');
      }
    } catch (error) {
      setSubmissionStatus('Network error, please try again later.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 to-purple-600 text-white p-4">
      <div className="text-center">
        <h1 className="text-3xl sm:text-7xl font-bold mb-6 animate-fade-in-up">
          Stranger<span className="text-pink-300">{" "}Match</span>
        </h1>
        <p className="text-lg sm:text-2xl mb-8 animate-fade-in-up animation-delay-200 font-semibold">
          Where strangers become soulmates...
        </p>
        <div className="flex justify-center items-center space-x-4 mb-8 animate-fade-in-up animation-delay-400">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="flex flex-col items-center">
              <span className="text-3xl md:text-5xl font-bold">{value}</span>
              <span className="text-sm uppercase">{unit}</span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 animate-fade-in-up animation-delay-600">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full md:w-64 bg-white/10 text-white placeholder-white/50 border-white/20 p-2 rounded outline-none"
          />
          <button type="submit" className="w-full md:w-auto bg-white text-purple-600 hover:bg-pink-100 font-bold py-2 px-4 rounded flex items-center justify-center">
            Notify Me <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </form>
        {submissionStatus && <p className="mt-4">{submissionStatus}</p>}
      </div>
      <Heart className="absolute top-4 right-4 h-8 w-8 text-pink-300 animate-pulse" />
      <p className="absolute bottom-4 left-4 h-8 w-8 text-pink-300">surazbissoyi@gmail.com</p>
    </div>
  );
}
