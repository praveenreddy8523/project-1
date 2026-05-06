import { useState } from "react";

const AddProjectTagByUser = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedInvestment, setSelectedInvestment] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const users = ["User 1", "User 2", "User 3", "User 4"]; // Example user list
  const investments = {
    "User 1": ["Investment A", "Investment B"],
    "User 2": ["Investment C"],
    "User 3": ["Investment D", "Investment E"],
    "User 4": ["Investment F"],
  }; // Example investments per user
  const projectTags = ["Tech", "Finance", "Health", "Education"]; // Example project tags

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectTagData = {
      user: selectedUser,
      investment: selectedInvestment,
      tag: selectedTag,
    };
    console.log("Project Tag Submitted: ", projectTagData);
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Add Project Tag</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>User:</label>
          <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
            <option value="">Select a User</option>
            {users.map((user, index) => (
              <option key={index} value={user}>{user}</option>
            ))}
          </select>
        </div>
        {selectedUser && (
          <div className="form-group">
            <label>Investment:</label>
            <select value={selectedInvestment} onChange={(e) => setSelectedInvestment(e.target.value)} required>
              <option value="">Select an Investment</option>
              {investments[selectedUser]?.map((investment, index) => (
                <option key={index} value={investment}>{investment}</option>
              ))}
            </select>
          </div>
        )}
        {selectedInvestment && (
          <div className="form-group">
            <label>Project Tag:</label>
            <select value={selectedTag} onChange={(e) => setSelectedTag(e.target.value)} required>
              <option value="">Select a Tag</option>
              {projectTags.map((tag, index) => (
                <option key={index} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        )}
        <button type="submit" className="submit-button" disabled={!selectedTag}>
          Submit Tag
        </button>
      </form>
    </div>
  );
};

export default AddProjectTagByUser;
