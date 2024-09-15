import { useState } from "react";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { solveTechnicalProblem } from '../../service/service' ; // Import the service function

function TechnicalProblem() {
    const [formData, setFormData] = useState({
        criteria: ''
    });

    const [responseData, setResponseData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const data = await solveTechnicalProblem(formData.criteria); // Use the service function
            setResponseData(data);
        } catch (error) {
            setError("Error while fetching the Data");
            console.error("Error: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-white">
                Technical Problem
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-white">
                        Criteria
                        <input
                            type="text"
                            name="criteria"
                            value={formData.criteria}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                    </label>
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-purple-800 text-white font-semibold rounded-md shadow-sm hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />
                            Submitting...
                        </div>
                    ) : (
                        'Submit'
                    )}
                </button>
            </form>
            {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md border border-red-300">
                    <p>{error}</p>
                </div>
            )}
            {responseData && !error && (
                <div className="mt-8 p-6 border-t border-gray-200">
                    <h2 className="text-xl font-semibold mb-4 text-white">Response Data</h2>
                    <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                        <h3 className="text-lg font-semibold mb-2">Candidate's Answer:</h3>
                        <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">{responseData.raw}</pre>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Tasks Output:</h3>
                        {responseData.tasks_output.map((task, index) => (
                            <div key={index} className="mt-4 p-4 bg-gray-50 rounded-md shadow-sm">
                                <h4 className="font-medium text-gray-800 mb-2">Task {index + 1}</h4>
                                <p><strong>Description:</strong> {task.description}</p>
                                <p><strong>Expected Output:</strong> {task.expected_output}</p>
                                <p><strong>Summary:</strong> {task.summary}</p>
                                <p><strong>Raw Output:</strong></p>
                                <pre className="bg-gray-100 p-2 rounded-md overflow-x-auto">{task.raw}</pre>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default TechnicalProblem;
