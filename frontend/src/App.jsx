import { useEffect, useState } from 'react';
import { NavLink, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CarsPage from './pages/CarsPage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const initialForm = {
  name: '',
  email: '',
  password: '',
  make: '',
  model: '',
  year: new Date().getFullYear(),
  price: 0,
  mileage: 0,
  condition: 'Used',
  description: '',
  color: 'Unknown',
  fuelType: 'Petrol',
  transmission: 'Automatic'
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [cars, setCars] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('app-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem('app-token') || '');
  const [editCar, setEditCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchCars();
    }
  }, [token]);

  const request = async (path, options = {}) => {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      ...options
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(data?.message || 'Request failed');
    }
    return data;
  };

  const fetchCars = async () => {
    try {
      const data = await request('/allCars');
      setCars(data.allCars || []);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleInput = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const data = await request('/signin', {
        method: 'POST',
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password
        })
      });
      setMessage(data.message || 'Account created');
      setUser(data.userdata || null);
      setToken(data.token || '');
      if (data.token) {
        localStorage.setItem('app-token', data.token);
      }
      if (data.userdata) {
        localStorage.setItem('app-user', JSON.stringify(data.userdata));
      }
      setForm(initialForm);
      navigate('/cars');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await request('/login', {
        method: 'POST',
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });
      setMessage(data.message || 'Logged in');
      setUser(data.userdata || null);
      setToken(data.token || '');
      if (data.token) {
        localStorage.setItem('app-token', data.token);
      }
      if (data.userdata) {
        localStorage.setItem('app-user', JSON.stringify(data.userdata));
      }
      setForm(initialForm);
      navigate('/cars');
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleCreateCar = async (event) => {
    event.preventDefault();
    try {
      const data = await request('/createCar', {
        method: 'POST',
        body: JSON.stringify({
          make: form.make,
          model: form.model,
          year: parseInt(form.year),
          price: parseFloat(form.price),
          mileage: parseInt(form.mileage) || 0,
          condition: form.condition,
          description: form.description,
          color: form.color,
          fuelType: form.fuelType,
          transmission: form.transmission
        })
      });
      setMessage(data.message || 'Car listed successfully');
      setForm(initialForm);
      fetchCars();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const selectEdit = (car) => {
    setEditCar(car);
    setForm({
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price,
      mileage: car.mileage,
      condition: car.condition,
      description: car.description,
      color: car.color,
      fuelType: car.fuelType,
      transmission: car.transmission
    });
  };

  const handleUpdateCar = async (event) => {
    event.preventDefault();
    if (!editCar) return;
    try {
      const data = await request(`/updateCar/${editCar._id}`, {
        method: 'PUT',
        body: JSON.stringify({
          make: form.make,
          model: form.model,
          year: parseInt(form.year),
          price: parseFloat(form.price),
          mileage: parseInt(form.mileage) || 0,
          condition: form.condition,
          description: form.description,
          color: form.color,
          fuelType: form.fuelType,
          transmission: form.transmission
        })
      });
      setMessage(data.message || 'Car listing updated');
      setEditCar(null);
      setForm(initialForm);
      fetchCars();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleDeleteCar = async (id) => {
    try {
      const data = await request(`/deleteCar/${id}`, {
        method: 'DELETE'
      });
      setMessage(data.message || 'Car listing deleted');
      fetchCars();
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleCancelEdit = () => {
    setEditCar(null);
    setForm(initialForm);
  };

  const handleLogout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('app-token');
    localStorage.removeItem('app-user');
    setMessage('Logged out');
  };

  return (
      <div className="app-shell">
        <header>
          <div>
            <h1>🚗 Car Marketplace</h1>
            {user ? <p>Signed in as: {user.name || user.email}</p> : <p>Signup first, then login to buy/sell cars</p>}
          </div>
          <nav className="button-group">
            <NavLink className="nav-link" to="/register">
              Signup
            </NavLink>
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" to="/cars">
              Cars
            </NavLink>
            {user && (
              <button className="nav-button" onClick={handleLogout}>
                Logout
              </button>
            )}
          </nav>
        </header>

        <main>
          {message && <div className="message">{message}</div>}

          <Routes>
            <Route path="/" element={<Navigate to="/register" replace />} />
            <Route path="/login" element={<LoginPage form={form} handleInput={handleInput} handleLogin={handleLogin} />} />
            <Route path="/register" element={<RegisterPage form={form} handleInput={handleInput} handleRegister={handleRegister} />} />
            <Route
              path="/cars"
              element={
                user ? (
                  <CarsPage
                    cars={cars}
                    form={form}
                    handleInput={handleInput}
                    handleCreateCar={handleCreateCar}
                    editCar={editCar}
                    selectEdit={selectEdit}
                    handleUpdateCar={handleUpdateCar}
                    handleDeleteCar={handleDeleteCar}
                    handleCancelEdit={handleCancelEdit}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </main>
      </div>
  );
}

export default App;

                    editNote={editNote}
                    selectEdit={selectEdit}
                    handleUpdateNote={handleUpdateNote}
                    handleDeleteNote={handleDeleteNote}
                    handleCancelEdit={handleCancelEdit}
                  />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </main>
      </div>
  );
}

export default App;
