const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100 text-gray-800">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">Mini CRM Dashboard</h1>
      </header>
      <main className="p-4">{children}</main>
      <footer className="text-center py-4 text-sm text-gray-600">
        &copy; 2025 Mini CRM by You
      </footer>
    </div>
  );
};

export default Layout;
