// Simple API endpoint that simulates adding a meetup
// In a real app, this would save to a database

export default async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log("New meetup data received:", data);

    res.status(201).json({ 
      message: "Meetup added successfully!",
      meetup: {
        id: `m${Date.now()}`,
        ...data
      }
    });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}