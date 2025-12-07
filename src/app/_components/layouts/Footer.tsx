export default function Footer() {
  return (
    <footer className="py-28 flex flex-col items-center gap-12">
      <div className="px-12 max-w-[1920px] w-full">
        <h2 className="text-6xl">
          Together, we can make your projects a reality
        </h2>
      </div>
      {/* cr  */}
      <div className="px-12 max-w-[1920px] w-full text-muted-foreground flex justify-between">
        <p>&copy; 2025 Merai Construction</p>
        <ul className="flex gap-4">
          <li>Projects</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>
      </div>
    </footer>
  );
}
