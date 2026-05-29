const carImages = {
  sedan: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80',
  suv: 'https://images.unsplash.com/photo-1609708536965-3eb88a5f4aed?auto=format&fit=crop&w=800&q=80',
  truck: 'https://images.unsplash.com/photo-1533473359331-35b3d334e8e1?auto=format&fit=crop&w=800&q=80',
  coupe: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&w=800&q=80',
  hatchback: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&w=800&q=80',
  default: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80'
};

function getCarImage(car) {
  const text = `${car.make || ''} ${car.model || ''}`.toLowerCase();
  if (text.includes('civic') || text.includes('accord') || text.includes('camry') || text.includes('corolla')) return carImages.sedan;
  if (text.includes('crv') || text.includes('highlander') || text.includes('explorer') || text.includes('escape')) return carImages.suv;
  if (text.includes('f-150') || text.includes('silverado') || text.includes('ram')) return carImages.truck;
  if (text.includes('mustang') || text.includes('charger') || text.includes('corvette')) return carImages.coupe;
  if (text.includes('civic') || text.includes('focus')) return carImages.hatchback;
  return carImages.default;
}

function CarsPage({
  cars,
  form,
  handleInput,
  handleCreateCar,
  editCar,
  selectEdit,
  handleUpdateCar,
  handleDeleteCar,
  handleCancelEdit
}) {
  return (
    <>
      <section className="card page-card">
        <h2>{editCar ? 'Update Car Listing' : 'List New Car for Sale'}</h2>
        <form onSubmit={editCar ? handleUpdateCar : handleCreateCar}>
          <div className="form-row">
            <label>
              Make
              <input type="text" value={form.make} onChange={handleInput('make')} required />
            </label>
            <label>
              Model
              <input type="text" value={form.model} onChange={handleInput('model')} required />
            </label>
          </div>
          <div className="form-row">
            <label>
              Year
              <input type="number" value={form.year} onChange={handleInput('year')} required />
            </label>
            <label>
              Price ($)
              <input type="number" value={form.price} onChange={handleInput('price')} required />
            </label>
          </div>
          <div className="form-row">
            <label>
              Mileage (Miles)
              <input type="number" value={form.mileage} onChange={handleInput('mileage')} />
            </label>
            <label>
              Color
              <input type="text" value={form.color} onChange={handleInput('color')} />
            </label>
          </div>
          <div className="form-row">
            <label>
              Condition
              <select value={form.condition} onChange={handleInput('condition')}>
                <option value="New">New</option>
                <option value="Used">Used</option>
                <option value="Certified Pre-Owned">Certified Pre-Owned</option>
              </select>
            </label>
            <label>
              Fuel Type
              <select value={form.fuelType} onChange={handleInput('fuelType')}>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </label>
          </div>
          <label>
            Transmission
            <select value={form.transmission} onChange={handleInput('transmission')}>
              <option value="Manual">Manual</option>
              <option value="Automatic">Automatic</option>
            </select>
          </label>
          <label>
            Description
            <textarea value={form.description} onChange={handleInput('description')} required />
          </label>
          <div className="form-actions">
            <button type="submit">{editCar ? 'Update Listing' : 'List Car'}</button>
            {editCar && (
              <button type="button" className="secondary" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="card notes-list">
        <h2>Available Cars ({cars.length})</h2>
        {cars.length === 0 ? (
          <p>No cars listed yet. Be the first to list a car!</p>
        ) : (
          <div className="notes-grid">
            {cars.map((car) => (
              <article key={car._id} className="note-card">
                <div className="note-image-wrapper">
                  <img src={getCarImage(car)} alt={`${car.make} ${car.model}`} className="note-image" />
                  <div className="car-price">${car.price.toLocaleString()}</div>
                </div>
                <div className="note-copy">
                  <h3>{car.make} {car.model}</h3>
                  <div className="car-details">
                    <p><strong>Year:</strong> {car.year}</p>
                    <p><strong>Condition:</strong> {car.condition}</p>
                    <p><strong>Mileage:</strong> {car.mileage.toLocaleString()} miles</p>
                    <p><strong>Color:</strong> {car.color}</p>
                    <p><strong>Fuel:</strong> {car.fuelType} | <strong>Transmission:</strong> {car.transmission}</p>
                    <p><strong>Details:</strong> {car.description}</p>
                  </div>
                  <div className="note-actions">
                    <button onClick={() => selectEdit(car)}>Edit</button>
                    <button className="danger" onClick={() => handleDeleteCar(car._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default CarsPage;
