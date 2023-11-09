import { mongoose } from '../conn';

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

export { User };

