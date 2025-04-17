import { useState } from "react";
import { Dropdown, DropdownItem } from "flowbite-react";

const languages = ["English", "Spanish", "French", "German"];

export default function Header() {
  const [selectedLang, setSelectedLang] = useState("English");

  return (
    <header className="w-full custom-gradient text-white border-b shadow-sm px-6 py-2 flex justify-between items-center">
      {/* Language Dropdown */}
      <Dropdown label={selectedLang} inline>
        {languages.map((lang) => (
          <DropdownItem key={lang} onClick={() => setSelectedLang(lang)}>
            {lang}
          </DropdownItem>
        ))}
      </Dropdown>
    </header>
  );
}
