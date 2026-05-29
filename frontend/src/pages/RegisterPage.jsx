function RegisterPage({ form, handleInput, handleRegister }) {
  return (
    <section className="card page-card">
      <h2>Signup</h2>
      <form onSubmit={handleRegister}>
        <label>
          Name
          <input type="text" value={form.name} onChange={handleInput('name')} required />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={handleInput('email')} required />
        </label>
        <label>
          Password
          <input type="password" value={form.password} onChange={handleInput('password')} required />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </section>
  );
}

export default RegisterPage;
