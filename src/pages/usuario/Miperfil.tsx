import { useState, useEffect } from "react";
import styles from "../../styles/usuario/usuario.module.css";

interface UserProfile {
  id: number;
  fullName: string;
  username: string;
  email: string;
  role: string;
  career?: string;
  semester?: number;
  department?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
}

export default function Miperfil_usuario() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Cargar datos del usuario desde localStorage
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      const user = JSON.parse(userData);
      const userProfile: UserProfile = {
        id: user.id,
        fullName: user.fullName || "Usuario",
        username: user.username,
        email: user.email,
        role: user.role,
        career: user.career,
        semester: user.semester,
        department: user.department,
        phone: user.phone || "",
        address: user.address || "",
        dateOfBirth: user.dateOfBirth || "",
      };
      setProfile(userProfile);
      setEditedProfile(userProfile);
    }
    setLoading(false);
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setSaveSuccess(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    if (editedProfile) {
      setProfile(editedProfile);
      // Actualizar localStorage
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      const updatedUser = { ...currentUser, ...editedProfile };
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleChange = (field: keyof UserProfile, value: string | number) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        [field]: value,
      });
    }
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Mi Perfil</h1>
        <div className={styles.muted}>Cargando perfil...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className={styles.page}>
        <h1 className={styles.title}>Mi Perfil</h1>
        <div className={styles.card}>No se pudo cargar la información del perfil</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Mi Perfil</h1>

      {saveSuccess && (
        <div className={styles.card} style={{ backgroundColor: '#d4edda', borderColor: '#c3e6cb' }}>
          ✓ Perfil actualizado correctamente
        </div>
      )}

      <div className={styles.stack}>
        {/* Información básica */}
        <div className={styles.card}>
          <h2 className={styles.label}>Información Personal</h2>
          <div className={styles.stack}>
            <div>
              <label className={styles.label}>Nombre Completo:</label>
              {isEditing ? (
                <input
                  className={styles.input}
                  type="text"
                  value={editedProfile?.fullName || ""}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                />
              ) : (
                <div>{profile.fullName}</div>
              )}
            </div>

            <div>
              <label className={styles.label}>Usuario:</label>
              <div>{profile.username}</div>
            </div>

            <div>
              <label className={styles.label}>Email:</label>
              {isEditing ? (
                <input
                  className={styles.input}
                  type="email"
                  value={editedProfile?.email || ""}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
              ) : (
                <div>{profile.email}</div>
              )}
            </div>

            <div>
              <label className={styles.label}>Rol:</label>
              <div className={styles.badge}>
                {profile.role === 'estudiante' ? '👨‍🎓 Estudiante' : 
                 profile.role === 'profesor' ? '👨‍🏫 Profesor' : 
                 '👨‍💼 Administrador'}
              </div>
            </div>

            <div>
              <label className={styles.label}>Teléfono:</label>
              {isEditing ? (
                <input
                  className={styles.input}
                  type="tel"
                  value={editedProfile?.phone || ""}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="Ingrese su teléfono"
                />
              ) : (
                <div>{profile.phone || "No especificado"}</div>
              )}
            </div>

            <div>
              <label className={styles.label}>Fecha de Nacimiento:</label>
              {isEditing ? (
                <input
                  className={styles.input}
                  type="date"
                  value={editedProfile?.dateOfBirth || ""}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                />
              ) : (
                <div>{profile.dateOfBirth || "No especificado"}</div>
              )}
            </div>

            <div>
              <label className={styles.label}>Dirección:</label>
              {isEditing ? (
                <textarea
                  className={styles.textarea}
                  value={editedProfile?.address || ""}
                  onChange={(e) => handleChange('address', e.target.value)}
                  placeholder="Ingrese su dirección"
                  rows={3}
                />
              ) : (
                <div>{profile.address || "No especificado"}</div>
              )}
            </div>
          </div>
        </div>

        {/* Información académica */}
        {(profile.career || profile.semester || profile.department) && (
          <div className={styles.card}>
            <h2 className={styles.label}>Información Académica</h2>
            <div className={styles.stack}>
              {profile.career && (
                <div>
                  <label className={styles.label}>Carrera:</label>
                  <div>{profile.career}</div>
                </div>
              )}
              
              {profile.semester && (
                <div>
                  <label className={styles.label}>Semestre:</label>
                  <div>{profile.semester}</div>
                </div>
              )}
              
              {profile.department && (
                <div>
                  <label className={styles.label}>Departamento:</label>
                  <div>{profile.department}</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Botones de acción */}
        <div className={styles.row}>
          {!isEditing ? (
            <button className={styles.button} type="button" onClick={handleEdit}>
              ✏️ Editar Perfil
            </button>
          ) : (
            <>
              <button className={styles.button} type="button" onClick={handleSave}>
                💾 Guardar Cambios
              </button>
              <button 
                className={styles.button} 
                type="button" 
                onClick={handleCancel}
                style={{ backgroundColor: '#6c757d' }}
              >
                ❌ Cancelar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}