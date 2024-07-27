// Header.tsx
import { FC } from "react";

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
  return <div style={headerStyle}>{children}</div>;
};

export default Header;
const headerStyle: React.CSSProperties = {
  position: "fixed",
  top: "2%",
  left: "30%",
  width: "40%",
  height: "5vh", // 10% от высоты экрана
  backgroundColor: "#f0f0f0", // Цвет фона
  borderBottom: "1px solid #ccc", // Опциональная граница снизу
  zIndex: 1000, // Устанавливаем z-index, чтобы полоска была поверх другого контента
  display: "flex",
  justifyContent: "flex-end", // Размещаем дочерние элементы справа
  alignItems: "center", // Центрируем дочерние элементы по вертикали
  borderRadius: "15px",
};
