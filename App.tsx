// App.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  StyleSheet
} from 'react-native';

type Car = {
  id: string;
  make: string;
  model: string;
  costPerDay: number;
  image: string;
};

type Screen = 'login' | 'book' | 'confirm';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [days, setDays] = useState('');
  const [showModal, setShowModal] = useState(false);

  const cars: Car[] = [
    {
      id: '1',
      make: 'Mercedes-Benz',
      model: 'S-Class',
      costPerDay: 120,
      image: 'https://images.unsplash.com/photo-1563720223485-2390d9e0b533?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '2',
      make: 'BMW',
      model: '7 Series',
      costPerDay: 110,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '3',
      make: 'Audi',
      model: 'A8',
      costPerDay: 100,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
  ];

  const calculateTotal = () => {
    if (selectedCar && days) {
      return selectedCar.costPerDay * parseInt(days);
    }
    return 0;
  };

  const handleBook = () => {
    setShowModal(true);
  };

  const confirmBooking = () => {
    setShowModal(false);
    setCurrentScreen('confirm'); // Move to Page 3
  };

  // PAGE 1: Login Screen
  if (currentScreen === 'login') {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Royal Drive</Text>
        <Text style={styles.subtitle}>Luxury Car Rentals</Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setCurrentScreen('book')} // Move to Page 2
        >
          <Text style={styles.buttonText}>Enter App</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // PAGE 2: Book Car Screen
  if (currentScreen === 'book') {
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.title}>Book Your Car</Text>
          <TouchableOpacity onPress={() => setCurrentScreen('login')}>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.carList}>
          {cars.map(car => (
            <TouchableOpacity 
              key={car.id}
              style={[
                styles.carCard,
                selectedCar?.id === car.id && styles.selectedCar
              ]}
              onPress={() => setSelectedCar(car)}
            >
              <Image source={{ uri: car.image }} style={styles.carImage} />
              <View style={styles.carInfo}>
                <Text style={styles.carName}>{car.make} {car.model}</Text>
                <Text style={styles.carPrice}>${car.costPerDay}/day</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.bookingSection}>
          <TextInput
            style={styles.input}
            placeholder="Number of days"
            value={days}
            onChangeText={setDays}
            keyboardType="numeric"
          />
          
          <TouchableOpacity 
            style={[
              styles.button, 
              (!selectedCar || !days) && styles.buttonDisabled
            ]}
            onPress={handleBook}
            disabled={!selectedCar || !days}
          >
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={showModal} animationType="slide" transparent>
          <View style={styles.modal}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Booking</Text>
              <Text style={styles.modalText}>
                {selectedCar?.make} {selectedCar?.model} for {days} days
              </Text>
              <Text style={styles.modalPrice}>Total: ${calculateTotal()}</Text>
              
              <View style={styles.modalButtons}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.confirmButton]}
                  onPress={confirmBooking} // Move to Page 3
                >
                  <Text style={styles.buttonText}>Yes, Confirm</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // PAGE 3: Confirmation Screen
  if (currentScreen === 'confirm') {
    return (
      <View style={styles.screen}>
        <Text style={styles.title}>Booking Confirmed! 🎉</Text>
        
        <View style={styles.confirmationCard}>
          <Image 
            source={{ uri: selectedCar?.image }} 
            style={styles.confirmationImage} 
          />
          <Text style={styles.confirmCar}>{selectedCar?.make} {selectedCar?.model}</Text>
          <Text style={styles.confirmText}>{days} days rental</Text>
          <Text style={styles.confirmTotal}>Total: ${calculateTotal()}</Text>
        </View>

        <TouchableOpacity 
          style={styles.button}
          onPress={() => setCurrentScreen('login')} // Back to Page 1
        >
          <Text style={styles.buttonText}>Book Another Car</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6a0dad',
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#8a2be2',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#6a0dad',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  backText: {
    color: '#6a0dad',
    fontSize: 16,
    fontWeight: 'bold',
  },
  carList: {
    flex: 1,
  },
  carCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedCar: {
    borderWidth: 2,
    borderColor: '#6a0dad',
    backgroundColor: '#f0e6ff',
  },
  carImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  carInfo: {
    flex: 1,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  carPrice: {
    fontSize: 16,
    color: '#6a0dad',
    fontWeight: 'bold',
  },
  bookingSection: {
    marginTop: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6a0dad',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  modalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a0dad',
    marginVertical: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 15,
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  confirmButton: {
    backgroundColor: '#6a0dad',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#6a0dad',
  },
  cancelText: {
    color: '#6a0dad',
    fontWeight: 'bold',
  },
  confirmationCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
  },
  confirmationImage: {
    width: 200,
    height: 120,
    borderRadius: 8,
    marginBottom: 15,
  },
  confirmCar: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  confirmText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  confirmTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6a0dad',
    marginTop: 10,
  },
});

export default App;