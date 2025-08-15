// FILE: server/seeder.js

const mongoose = require('mongoose');

// --- Your Connection String ---
const dbConnectionString = "mongodb+srv://Sriramsundaraneeedi:5R5KmzC8rwJrJ0jS@sriram55.ohjc5qd.mongodb.net/pharmaCareDB?retryWrites=true&w=majority&appName=sriram55";

// --- The Medicine Data (now directly inside this file) ---
// This data does not contain any local image imports.
const medicineData = [
  { id: 1, name: 'Paracetamol 500mg', description: 'For fever and pain relief', price: 30.50, mrp: 35.00, country: 'INDIA', seller: 'Pharma Direct', offers: ['5% Discount on General & OTC products T&C', '3% Off on bills above ₹999.99']},
  { id: 2, name: 'Ibuprofen 200mg', description: 'A nonsteroidal anti-inflammatory drug (NSAID) used for relieving pain, helping with fever, and reducing inflammation.', price: 85.00, mrp: 92.00, country: 'INDIA', seller: 'MedLife Wellness', offers: ['5% Discount on General & OTC products T&C']},
  { id: 3, name: 'Aspirin 75mg', description: 'Blood thinner, pain relief', price: 25.20, mrp: 28.00, country: 'INDIA', seller: 'Pharma Direct', offers: []},
  { id: 4, name: 'Cetirizine 10mg', description: 'Antihistamine for allergies', price: 110.00, mrp: 115.00, country: 'INDIA', seller: 'MedLife Wellness', offers: ['3% Off on bills above ₹999.99']},
  { id: 5, name: 'Loratadine 10mg', description: 'Non-drowsy allergy relief', price: 150.50, mrp: 160.00, country: 'USA', seller: 'Global Meds', offers: []},
  { id: 6, name: 'Amoxicillin 250mg', description: 'Antibiotic for infections', price: 220.30, mrp: 230.00, country: 'INDIA', seller: 'Pharma Direct', offers: []},
  { id: 7, name: 'Omeprazole 20mg', description: 'For acid reflux and heartburn', price: 98.90, mrp: 105.00, country: 'INDIA', seller: 'MedLife Wellness', offers: []},
  { id: 8, name: 'Metformin 500mg', description: 'For type 2 diabetes', price: 115.45, mrp: 125.00, country: 'INDIA', seller: 'Pharma Direct', offers: []},
  { id: 9, name: 'Atorvastatin 10mg', description: 'To lower cholesterol', price: 310.10, mrp: 320.00, country: 'USA', seller: 'Global Meds', offers: []},
  { id: 10, name: 'Salbutamol Inhaler', description: 'For asthma and COPD', price: 450.00, mrp: 475.00, country: 'UK', seller: 'Global Meds', offers: []},
  { id: 11, name: 'Ranitidine 150mg', description: 'Reduces stomach acid', price: 79.80, mrp: 85.00, country: 'INDIA', seller: 'Pharma Direct', offers: []},
  { id: 12, name: 'Cough Syrup', description: 'Cough suppressant', price: 140.25, mrp: 150.00, country: 'INDIA', seller: 'MedLife Wellness', offers: []},
  { id: 13, name: 'Guaifenesin Syrup', description: 'Expectorant for chesty coughs', price: 135.50, mrp: 145.00, country: 'INDIA', seller: 'MedLife Wellness', offers: []},
  { id: 14, name: 'Multivitamin Tablets', description: 'Daily dietary supplement', price: 250.00, mrp: 260.00, country: 'USA', seller: 'Global Meds', offers: []},
  { id: 15, name: 'Vitamin D3 1000 IU', description: 'For bone health', price: 199.99, mrp: 210.00, country: 'USA', seller: 'Global Meds', offers: []},
  { id: 16, name: 'Calcium 500mg', description: 'Calcium supplement', price: 160.75, mrp: 170.00, country: 'INDIA', seller: 'Pharma Direct', offers: []},
  { id: 17, name: 'Folic Acid 5mg', description: 'For pregnancy and anemia', price: 75.60, mrp: 80.00, country: 'INDIA', seller: 'Pharma Direct', offers: []},
  { id: 18, name: 'Iron (Ferrous Sulfate)', description: 'For iron-deficiency anemia', price: 102.20, mrp: 110.00, country: 'INDIA', seller: 'Pharma Direct', offers: []},
  { id: 19, name: 'Antifungal Cream', description: 'Antifungal cream', price: 215.50, mrp: 225.00, country: 'INDIA', seller: 'MedLife Wellness', offers: []},
  { id: 20, name: 'Hydrocortisone Cream 1%', description: 'For skin irritation and rashes', price: 178.80, mrp: 185.00, country: 'INDIA', seller: 'MedLife Wellness', offers: []},
  { id: 21, name: 'Miconazole Nitrate', description: 'Treats fungal infections', price: 230.00, mrp: 240.00, country: 'INDIA', seller: 'MedLife Wellness', offers: []},
  { id: 22, name: 'Loperamide 2mg', description: 'For diarrhea relief', price: 69.90, mrp: 75.00, country: 'INDIA', seller: 'Pharma Direct', offers: []},
  { id: 23, name: 'Simethicone 125mg', description: 'For gas and bloating relief', price: 95.00, mrp: 100.00, country: 'INDIA', seller: 'Pharma Direct', offers: []},
  { id: 24, name: 'Diphenhydramine 25mg', description: 'Antihistamine, sleep aid', price: 110.00, mrp: 115.00, country: 'USA', seller: 'Global Meds', offers: []},
  { id: 25, name: 'Naproxen 220mg', description: 'Pain reliever and fever reducer', price: 105.50, mrp: 112.00, country: 'USA', seller: 'Global Meds', offers: []},
  { id: 26, name: 'Azithromycin 500mg', description: 'Antibiotic for various infections', price: 350.40, mrp: 360.00, country: 'INDIA', seller: 'Pharma Direct', offers: []},
  { id: 27, name: 'Ciprofloxacin 500mg', description: 'Broad-spectrum antibiotic', price: 400.00, mrp: 415.00, country: 'INDIA', seller: 'Pharma Direct', offers: []},
  { id: 28, name: 'Prednisone 5mg', description: 'Corticosteroid', price: 280.75, mrp: 290.00, country: 'INDIA', seller: 'Pharma Direct', offers: []},
  { id: 29, name: 'Warfarin 5mg', description: 'Anticoagulant (blood thinner)', price: 132.20, mrp: 140.00, country: 'UK', seller: 'Global Meds', offers: []},
  { id: 30, name: 'Levothyroxine 50mcg', description: 'For hypothyroidism', price: 240.60, mrp: 250.00, country: 'UK', seller: 'Global Meds', offers: []}
];

// --- Mongoose Schema and Model ---
const medicineSchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  mrp: Number,
  country: String,
  seller: String,
  offers: [String],
  imageUrl: String,
  thumbnails: [String]
});

const Medicine = mongoose.model('Medicine', medicineSchema);

const importData = async () => {
  try {
    await mongoose.connect(dbConnectionString);
    console.log("Connected to MongoDB for seeding...");

    await Medicine.deleteMany();
    console.log("Existing data cleared.");

    // Add placeholder image URLs to the data before inserting
    const dataToInsert = medicineData.map(med => ({
      ...med,
      imageUrl: `https://picsum.photos/id/${med.id + 30}/400/400`,
      thumbnails: [`https://picsum.photos/id/${med.id + 30}/60/60`, `https://picsum.photos/id/${med.id + 40}/60/60`]
    }));

    await Medicine.insertMany(dataToInsert);
    console.log("Data successfully imported!");
    process.exit();
  } catch (error) {
    console.error("Error with data import:", error);
    process.exit(1);
  }
};

importData();
