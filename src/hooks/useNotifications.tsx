import { useEffect, useRef, useState } from 'react';

// Simple notification hook that connects to a WebSocket (if provided via VITE_WS_URL)
// Falls back to a short polling mock when WS URL is not configured.

export default function useNotifications() {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [messages, setMessages] = useState<any[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl = (import.meta as any).env?.VITE_WS_URL;
    if (wsUrl) {
      try {
        const ws = new WebSocket(wsUrl);
        wsRef.current = ws;
        ws.onopen = () => {
          console.log('Notifications WS connected');
        };
        ws.onmessage = (evt) => {
          try {
            const payload = JSON.parse(evt.data);
            setMessages(prev => [payload, ...prev]);
            setUnreadCount(c => c + 1);
          } catch (e) {
            // non-json message
            setMessages(prev => [{ text: evt.data }, ...prev]);
            setUnreadCount(c => c + 1);
          }
        };
        ws.onclose = () => console.log('Notifications WS closed');
        ws.onerror = (e) => console.warn('Notifications WS error', e);
      } catch (e) {
        console.warn('Failed to connect notifications WS', e);
      }

      return () => {
        if (wsRef.current) wsRef.current.close();
      };
    }

    // Fallback mock: increment unread every 5s for demo (dev only)
    const mockNotifications = [
      'New notice posted: Academic Calendar Updated',
      'Event reminder: Tech Fest tomorrow',
      'Lost item found: Blue backpack in library',
      'New user registered: John Doe',
      'Event cancelled: Workshop on AI'
    ];
    
    let notificationIndex = 0;
    const t = setInterval(() => {
      const mock = { 
        id: Date.now(), 
        text: mockNotifications[notificationIndex % mockNotifications.length],
        time: new Date().toLocaleTimeString()
      };
      setMessages(prev => [mock, ...prev]);
      setUnreadCount(c => c + 1);
      notificationIndex++;
    }, 5000);

    return () => clearInterval(t);
  }, []);

  const markAllRead = () => setUnreadCount(0);

  return { unreadCount, messages, markAllRead };
}
