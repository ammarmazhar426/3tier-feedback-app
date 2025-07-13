import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://your-ec2-ip/api/feedback', form);
      alert('Feedback submitted!');
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    }
  };

  return (
    <div className="container">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
        <textarea placeholder="Message" onChange={e => setForm({ ...form, message: e.target.value })} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;

