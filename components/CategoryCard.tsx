import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Car, Hop as HomeIcon, Briefcase, Smartphone } from 'lucide-react-native';
import { Category } from '@/types';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
}

export default function CategoryCard({ category, onPress }: CategoryCardProps) {
  const getIcon = () => {
    const iconProps = { color: '#FFFFFF', size: 36, strokeWidth: 2 };
    switch (category.icon) {
      case 'car':
        return <Car {...iconProps} />;
      case 'home':
        return <HomeIcon {...iconProps} />;
      case 'briefcase':
        return <Briefcase {...iconProps} />;
      case 'smartphone':
        return <Smartphone {...iconProps} />;
      default:
        return <Car {...iconProps} />;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.container}>
      <LinearGradient
        colors={[category.gradient.from, category.gradient.to]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}>
        <View style={styles.iconContainer}>{getIcon()}</View>
        <Text style={styles.text}>{category.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    height: 120,
    marginBottom: 16,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  gradient: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  iconContainer: {
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
});
