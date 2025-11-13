import {
  Box,
  Heading,
  Button,
  Input,
  Stack,
  Text,
  Grid,
  Flex,
  Badge,
} from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@chakra-ui/react';
import { FiSettings, FiUser, FiBell, FiLock } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { userService } from '../services/userService';

const Settings = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    department: ''
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    weeklyDigest: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await userService.getCurrentUser();
      setUser(response.data);
      setProfileForm({
        name: response.data.name || '',
        email: response.data.email || '',
        department: (response.data as any).department || ''
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = () => {
    // In a real app, this would make an API call
    alert('Profile updated successfully!');
    setShowProfileModal(false);
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    // In a real app, this would make an API call
    alert('Password changed successfully!');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswordModal(false);
  };

  if (loading) {
    return <Text>Loading settings...</Text>;
  }

  return (
    <Box>
      <Heading mb={6} size="lg">
        Settings
      </Heading>

      <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={6}>
        {/* Profile Settings */}
        <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Flex align="center" gap={3} mb={4}>
            <Box p={3} bg="blue.100" borderRadius="lg">
              <FiUser size={20} color="#3182ce" />
            </Box>
            <Box>
              <Heading size="md">Profile Settings</Heading>
              <Text fontSize="sm" color="gray.500">Manage your personal information</Text>
            </Box>
          </Flex>
          
          <Stack gap={3}>
            <Box>
              <Text fontSize="sm" fontWeight="semibold" color="gray.600">Name</Text>
              <Text>{user?.name || 'Not set'}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="semibold" color="gray.600">Email</Text>
              <Text>{user?.email || 'Not set'}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="semibold" color="gray.600">Department</Text>
              <Text>{user?.department || 'Not set'}</Text>
            </Box>
            <Box>
              <Text fontSize="sm" fontWeight="semibold" color="gray.600">Role</Text>
              <Badge colorPalette="blue">{user?.role || 'User'}</Badge>
            </Box>
          </Stack>

          <DialogRoot open={showProfileModal} onOpenChange={(e) => setShowProfileModal(e.open)}>
            <DialogTrigger asChild>
              <Button colorPalette="blue" mt={4} w="full">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <Stack gap={4}>
                  <Input
                    placeholder="Full Name"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                  />
                  <Input
                    type="email"
                    placeholder="Email Address"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                  />
                  <Input
                    placeholder="Department"
                    value={profileForm.department}
                    onChange={(e) => setProfileForm({...profileForm, department: e.target.value})}
                  />
                </Stack>
              </DialogBody>
              <DialogFooter>
                <DialogActionTrigger asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogActionTrigger>
                <Button colorPalette="blue" onClick={handleProfileUpdate}>
                  Save Changes
                </Button>
              </DialogFooter>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
        </Box>

        {/* Security Settings */}
        <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Flex align="center" gap={3} mb={4}>
            <Box p={3} bg="red.100" borderRadius="lg">
              <FiLock size={20} color="#e53e3e" />
            </Box>
            <Box>
              <Heading size="md">Security Settings</Heading>
              <Text fontSize="sm" color="gray.500">Manage your account security</Text>
            </Box>
          </Flex>

          <Stack gap={4}>
            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb={2}>Password</Text>
              <Text fontSize="sm" color="gray.500" mb={3}>
                Last changed: 30 days ago
              </Text>
              
              <DialogRoot open={showPasswordModal} onOpenChange={(e) => setShowPasswordModal(e.open)}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                  </DialogHeader>
                  <DialogBody>
                    <Stack gap={4}>
                      <Input
                        type="password"
                        placeholder="Current Password"
                        value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, currentPassword: e.target.value})}
                      />
                      <Input
                        type="password"
                        placeholder="New Password"
                        value={passwordForm.newPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                      />
                      <Input
                        type="password"
                        placeholder="Confirm New Password"
                        value={passwordForm.confirmPassword}
                        onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                      />
                    </Stack>
                  </DialogBody>
                  <DialogFooter>
                    <DialogActionTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>
                    <Button colorPalette="red" onClick={handlePasswordChange}>
                      Change Password
                    </Button>
                  </DialogFooter>
                  <DialogCloseTrigger />
                </DialogContent>
              </DialogRoot>
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb={2}>Two-Factor Authentication</Text>
              <Text fontSize="sm" color="gray.500" mb={3}>
                Add an extra layer of security to your account
              </Text>
              <Button variant="outline" size="sm" disabled>
                Enable 2FA (Coming Soon)
              </Button>
            </Box>
          </Stack>
        </Box>

        {/* Notification Settings */}
        <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Flex align="center" gap={3} mb={4}>
            <Box p={3} bg="green.100" borderRadius="lg">
              <FiBell size={20} color="#38a169" />
            </Box>
            <Box>
              <Heading size="md">Notification Settings</Heading>
              <Text fontSize="sm" color="gray.500">Choose how you want to be notified</Text>
            </Box>
          </Flex>

          <Stack gap={4}>
            <Box>
              <input 
                type="checkbox" 
                id="emailNotifications"
                checked={notifications.emailNotifications}
                onChange={(e) => setNotifications({...notifications, emailNotifications: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              <label htmlFor="emailNotifications">
                <Text fontSize="sm" fontWeight="semibold" display="inline">Email Notifications</Text>
                <Text fontSize="xs" color="gray.500">Receive notifications via email</Text>
              </label>
            </Box>

            <Box>
              <input 
                type="checkbox" 
                id="pushNotifications"
                checked={notifications.pushNotifications}
                onChange={(e) => setNotifications({...notifications, pushNotifications: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              <label htmlFor="pushNotifications">
                <Text fontSize="sm" fontWeight="semibold" display="inline">Push Notifications</Text>
                <Text fontSize="xs" color="gray.500">Receive push notifications in browser</Text>
              </label>
            </Box>

            <Box>
              <input 
                type="checkbox" 
                id="smsNotifications"
                checked={notifications.smsNotifications}
                onChange={(e) => setNotifications({...notifications, smsNotifications: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              <label htmlFor="smsNotifications">
                <Text fontSize="sm" fontWeight="semibold" display="inline">SMS Notifications</Text>
                <Text fontSize="xs" color="gray.500">Receive notifications via SMS</Text>
              </label>
            </Box>

            <Box>
              <input 
                type="checkbox" 
                id="weeklyDigest"
                checked={notifications.weeklyDigest}
                onChange={(e) => setNotifications({...notifications, weeklyDigest: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              <label htmlFor="weeklyDigest">
                <Text fontSize="sm" fontWeight="semibold" display="inline">Weekly Digest</Text>
                <Text fontSize="xs" color="gray.500">Get a weekly summary of activities</Text>
              </label>
            </Box>
          </Stack>
        </Box>

        {/* Privacy Settings */}
        <Box bg="white" p={6} borderRadius="lg" borderWidth="1px" borderColor="gray.200">
          <Flex align="center" gap={3} mb={4}>
            <Box p={3} bg="purple.100" borderRadius="lg">
              <FiSettings size={20} color="#805ad5" />
            </Box>
            <Box>
              <Heading size="md">Privacy Settings</Heading>
              <Text fontSize="sm" color="gray.500">Control your privacy preferences</Text>
            </Box>
          </Flex>

          <Stack gap={4}>
            <Box>
              <input 
                type="checkbox" 
                id="profileVisible"
                checked={privacy.profileVisible}
                onChange={(e) => setPrivacy({...privacy, profileVisible: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              <label htmlFor="profileVisible">
                <Text fontSize="sm" fontWeight="semibold" display="inline">Public Profile</Text>
                <Text fontSize="xs" color="gray.500">Make your profile visible to others</Text>
              </label>
            </Box>

            <Box>
              <input 
                type="checkbox" 
                id="showEmail"
                checked={privacy.showEmail}
                onChange={(e) => setPrivacy({...privacy, showEmail: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              <label htmlFor="showEmail">
                <Text fontSize="sm" fontWeight="semibold" display="inline">Show Email</Text>
                <Text fontSize="xs" color="gray.500">Display your email on profile</Text>
              </label>
            </Box>

            <Box>
              <input 
                type="checkbox" 
                id="showPhone"
                checked={privacy.showPhone}
                onChange={(e) => setPrivacy({...privacy, showPhone: e.target.checked})}
                style={{ marginRight: '8px' }}
              />
              <label htmlFor="showPhone">
                <Text fontSize="sm" fontWeight="semibold" display="inline">Show Phone</Text>
                <Text fontSize="xs" color="gray.500">Display your phone number on profile</Text>
              </label>
            </Box>
          </Stack>
        </Box>
      </Grid>

      {/* Save Settings */}
      <Box mt={6} textAlign="center">
        <Button 
          colorPalette="brand" 
          size="lg"
          onClick={() => {
            // In a real app, this would save all settings to the backend
            alert('Settings saved successfully!');
          }}
        >
          Save All Settings
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;