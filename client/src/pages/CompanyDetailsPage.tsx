import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  Container,
  Box,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StyledHeader from "../components/StyledHeader";
import { Company } from "../types/Company";
import { Admin } from "../types/Admin";
import { getCompanyInfo } from "../utils/getCompanyInfo";
import { addUsertoAdmins } from "../utils/addUserToAdmins";
import { getAdminsByCompanyId } from "../utils/getAdminsByCompanyId";
import { deleteAdminById } from "../utils/deleteAdminById";
import { fetchUserIdBySessionId } from "../utils/UserIdBySessionid";
// Импорт функции для получения userId по sessionId

const CompanyDetailsPage: FC = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string>(""); // Хранение ID текущего пользователя
  const [admins, setAdmins] = useState<Admin[]>([]); // Список админов с _id и userID
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Для отображения ошибки
  const [newAdminUserId, setNewAdminUserId] = useState<string>(""); // ID пользователя для добавления

  useEffect(() => {
    const loadCompanyData = async () => {
      if (companyId) {
        try {
          const companyData = await getCompanyInfo(companyId);
          setCompany(companyData);
          const adminsData = await getAdminsByCompanyId(companyId); // Загрузка админов
          setAdmins(adminsData);
        } catch (error) {
          console.error("Failed to load company or admin IDs:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    const initUserData = async () => {
      const sessionId = localStorage.getItem("sessionID"); // Получаем sessionID из localStorage
      if (sessionId) {
        try {
          const fetchedUserId = await fetchUserIdBySessionId(sessionId); // Получаем userId по sessionID
          setCurrentUserId(fetchedUserId); // Устанавливаем userId текущего пользователя в состояние
        } catch (error) {
          console.error("Failed to fetch user ID:", error);
        }
      }
    };

    initUserData(); // Инициализируем данные пользователя
    loadCompanyData(); // Загружаем данные компании и админов
  }, [companyId]);

  const handleAddAdmin = async () => {
    if (companyId) {
      // Проверяем, есть ли пользователь уже в списке админов
      const isUserAlreadyAdmin = admins.some(
        (admin) => admin.userId === newAdminUserId
      );

      if (isUserAlreadyAdmin) {
        setError("User is already an admin."); // Устанавливаем сообщение об ошибке
        return;
      }

      try {
        await addUsertoAdmins(newAdminUserId, companyId);
        const adminsData = await getAdminsByCompanyId(companyId); // Обновляем список админов после добавления
        setAdmins(adminsData);
        setNewAdminUserId(""); // Очищаем поле
        setError(null); // Очищаем сообщение об ошибке
      } catch (error) {
        console.error("Failed to add admin:", error);
      }
    }
  };

  const handleDeleteAdmin = async (adminId: string, adminUserId: string) => {
    // Проверка, чтобы текущий пользователь не мог удалить себя
    if (adminUserId === currentUserId) {
      setError("You cannot delete yourself as an admin."); // Сообщение об ошибке
      return;
    }

    try {
      await deleteAdminById(adminId); // Удаляем админа по его _id
      const adminsData = await getAdminsByCompanyId(companyId!); // Обновляем список админов после удаления
      setAdmins(adminsData);
      setError(null); // Очищаем сообщение об ошибке
    } catch (error) {
      console.error("Failed to delete admin:", error);
    }
  };

  return (
    <div>
      <StyledHeader />
      <Container
        maxWidth="md"
        sx={{
          marginTop: 16,
        }}
      >
        {loading ? (
          <Typography>Loading...</Typography>
        ) : company ? (
          <Box>
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
              {company.name}
            </Typography>
            <Typography variant="body1">
              Location: {company.location}
            </Typography>
            <Typography variant="body1">
              Industry: {company.industry}
            </Typography>

            {/* Список администраторов */}
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h6">Admins</Typography>
              {admins.map((admin) => (
                <Box
                  key={admin._id}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ marginBottom: 2 }}
                >
                  <Typography variant="body1">
                    Admin ID: {admin.userId}
                  </Typography>
                  {admin.userId !== currentUserId && ( // Кнопка удаления только для других админов
                    <IconButton
                      onClick={() => handleDeleteAdmin(admin._id, admin.userId)} // Передаем _id и userId
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}
            </Box>

            {/* Добавление нового администратора */}
            <Box sx={{ marginTop: 4 }}>
              <Typography variant="h6">Add Admin</Typography>
              <TextField
                label="User ID"
                value={newAdminUserId}
                onChange={(e) => setNewAdminUserId(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              {error && (
                <Typography
                  color="error"
                  variant="body2"
                  sx={{ marginBottom: 2 }}
                >
                  {error}
                </Typography>
              )}
              <Button variant="contained" onClick={handleAddAdmin}>
                Add Admin
              </Button>
            </Box>
          </Box>
        ) : (
          <Typography>Company not found.</Typography>
        )}
      </Container>
    </div>
  );
};

export default CompanyDetailsPage;
