export default function AdminSettingsPage() {
    return (
        <div>
            <h1 className="h2 text-[#3E2723] mb-6">Platform Settings</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card">
                    <h3 className="h3 mb-4">General Configuration</h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Platform Status</label>
                            <select className="w-full p-2 border rounded">
                                <option value="open">Open for Business</option>
                                <option value="closed">Temporarily Closed</option>
                                <option value="maintenance">Maintenance Mode</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Standard Delivery Fee (MAD)</label>
                            <input type="number" className="w-full p-2 border rounded" defaultValue="10.00" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Free Delivery Threshold (MAD)</label>
                            <input type="number" className="w-full p-2 border rounded" defaultValue="100.00" />
                        </div>
                        <button type="button" className="btn btn-primary w-full">
                            Save Changes
                        </button>
                    </form>
                </div>

                <div className="card">
                    <h3 className="h3 mb-4">Service Areas</h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Allowed Cities</label>
                            <textarea className="w-full p-2 border rounded h-32" defaultValue="Casablanca, Rabat, Marrakech" />
                            <p className="text-xs text-muted mt-1">Comma separated list of cities where service is available.</p>
                        </div>
                        <button type="button" className="btn btn-primary w-full">
                            Update Areas
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
