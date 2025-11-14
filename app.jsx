export default function Home() {
  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>Welcome to Next.js!</h1>
      <p style={styles.text}>
        This is a sample <b>page.jsx</b> file using normal JSX + inline CSS.
      </p>
      <button style={styles.button}>Click Me</button>
    </main>
  );
}

const styles = {
  container: {
    padding: "40px",
    textAlign: "center",
  },
  heading: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "18px",
    color: "#333",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#0070f3",
    color: "white",
  }
};
