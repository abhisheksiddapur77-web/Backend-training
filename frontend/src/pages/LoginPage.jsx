function LoginPage({ form, handleInput, handleLogin }) {
  return (
    <section className="card page-card">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input type="email" value={form.email} onChange={handleInput('email')} required />
        </label>
        <label>
          Password
          <input type="password" value={form.password} onChange={handleInput('password')} required />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </section>
  );
}

export default LoginPage;
