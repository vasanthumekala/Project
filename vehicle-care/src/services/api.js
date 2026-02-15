// API service for vehicle care application
const BASE_URL = 'https://api.vehiclecare.com';

// Fetch vehicle maintenance records
async function getMaintenanceRecords(vehicleId) {
    try {
        const response = await fetch(`${BASE_URL}/vehicles/${vehicleId}/maintenance`);
        if (!response.ok) throw new Error('Failed to fetch records');
        return await response.json();
    } catch (error) {
        console.error('Error fetching maintenance records:', error);
        throw error;
    }
}

// Add new service record
async function addServiceRecord(vehicleId, serviceData) {
    try {
        const response = await fetch(`${BASE_URL}/vehicles/${vehicleId}/service`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(serviceData),
        });
        if (!response.ok) throw new Error('Failed to add service record');
        return await response.json();
    } catch (error) {
        console.error('Error adding service record:', error);
        throw error;
    }
}

// Get vehicle details
async function getVehicleDetails(vehicleId) {
    try {
        const response = await fetch(`${BASE_URL}/vehicles/${vehicleId}`);
        if (!response.ok) throw new Error('Failed to fetch vehicle details');
        return await response.json();
    } catch (error) {
        console.error('Error fetching vehicle details:', error);
        throw error;
    }
}

export { getMaintenanceRecords, addServiceRecord, getVehicleDetails };