import React, { useState, useEffect } from 'react';
import Search from './searchfunction';
import './checklist.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SecurePage = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Initialize navigate

    // Function to fetch data from the server
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/data/scan', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token to request headers
                },
            });
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Check if the user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if not authenticated
        } else {
            fetchData(); // Fetch data if authenticated
        }
    }, [navigate]);

    // Filter data based on search term
    const filteredData = data.filter((item) => {
        const fullName = item["Last Name, First Name (Legal Name)"];
        if (!fullName) return false;

        const [lastName, firstName] = fullName.split(',').map(name => name.trim());
        const displayName = `${firstName} ${lastName}`;

        return displayName.toLowerCase().startsWith(searchTerm.toLowerCase());
    });

    return (
        <div className="secure-page">
            <div className="content">
                <img src="https://i.imgur.com/YIChrEK.png" alt="Company Logo" />
                <h1>Welcome to the Secure Page</h1>
                <p>Click the "Scan" button to display data.</p>

                {/* Search component */}
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                {filteredData.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th className="red-header">Name</th>
                                <th className="red-header">Student ID</th>
                                <th className="red-header">Benefit</th>
                                <th className="red-header">Required Documents</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, index) => {
                                const fullName = item["Last Name, First Name (Legal Name)"] || 'Unknown';
                                const [lastName, firstName] = fullName.split(',').map(name => name.trim());
                                const displayName = `${firstName} ${lastName}`;

                                return (
                                    <tr key={index}>
                                        <td>{displayName}</td>
                                        <td>{item["Student ID # (This is NOT your Social Security Number or SSO ID)"] || 'N/A'}</td>
                                        <td>{item["Benefit you plan to utilize this term (check all that apply):"]}</td>
                                        <td>Required Docs</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                ) : (
                    <p>No veterans matching search</p>
                )}
            </div>
        </div>
    );
};

export default SecurePage;
