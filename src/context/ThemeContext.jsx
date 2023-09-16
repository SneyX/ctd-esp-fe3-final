import { createContext, useReducer, useContext, useEffect } from "react";

const initialState = {
    theme: "light",
    apiData: [],
    favoriteDentists: []
}

const themeReducer = (state, action) => {
    switch(action.type){
        case "TOGGLE_LIGHT":
            return {
                ...state,
                theme: "light"
            }
        case "TOGGLE_DARK":
            return {
                ...state,
                theme: "dark"
            }
        case "SET_API_DATA":
            return {
                ...state,
                apiData: action.payload
            }
        case "ADD_TO_FAVORITES":
            const dentistToAdd = action.payload;
            const updatedDentistsAdd = state.apiData.map((dentist) =>
               dentist.id === dentistToAdd.id
                   ? { ...dentist, isFavorite: true }
                  : dentist
               );
              // Guardar en localStorage
            const updatedFavoritesAdd = [
                ...state.favoriteDentists,
                dentistToAdd,
            ];
            localStorage.setItem(
                "favoriteDentists",
                JSON.stringify(updatedFavoritesAdd)
            );

            return {
                ...state,
                apiData: updatedDentistsAdd,
                favoriteDentists: updatedFavoritesAdd,
            };

            case "REMOVE_FROM_FAVORITES":
                const dentistToRemove = action.payload;
                const updatedDentistsRemove = state.apiData.map((dentist) =>
                  dentist.id === dentistToRemove.id
                    ? { ...dentist, isFavorite: false }
                    : dentist
                );
          
                // Actualizar localStorage al eliminar
                const updatedFavoritesRemove = state.favoriteDentists.filter(
                  (dentist) => dentist.id !== dentistToRemove.id
                );
                localStorage.setItem(
                  "favoriteDentists",
                  JSON.stringify(updatedFavoritesRemove)
                );
          
                return {
                  ...state,
                  apiData: updatedDentistsRemove,
                  favoriteDentists: updatedFavoritesRemove,
                };
              default:
                return state;
            }
}

const ThemeContext = createContext();

const ThemeProvider = ({children}) => {
    const [state, dispatch] = useReducer(themeReducer, initialState)

    // Llamada a la API cuando se renderiza el componente en primera instancia:
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
            dispatch({type: "SET_API_DATA", payload: data})
        })
        .catch((error) => console.error(error))
    },[])

    return (
        <ThemeContext.Provider value={{state, dispatch}}>
            {children}
        </ThemeContext.Provider>
    )
}

const useTheme = () => {
    const context = useContext(ThemeContext)

    if(!context){
        throw new Error("useTheme debe ser usado dentro de un ThemeProvider")
    }
    return context;
}

export {ThemeProvider, useTheme}