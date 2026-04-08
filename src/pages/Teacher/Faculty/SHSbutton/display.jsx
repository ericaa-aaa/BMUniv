export default function Add({ setShowAdd }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
    setShowAdd(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative h-100 font-[Inter] bg-white p-5 rounded-2xl">
      <h1>Add New Faculty</h1>
      <button type="submit">Submit</button>
      <button type="button" onClick={() => setShowAdd(false)}>Cancel</button>
    </form>
  );
}
