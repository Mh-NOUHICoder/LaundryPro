import { useApp } from '../context/AppContext'

export const useNotifications = () => {
  const { state, dispatch } = useApp()

  const showNotification = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { type, title, message }
    })
  }

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }

  return {
    notifications: state.notifications,
    showNotification,
    removeNotification
  }
}
