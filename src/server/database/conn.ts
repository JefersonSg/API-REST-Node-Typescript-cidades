import mongoose from 'mongoose';

async function main() {
  await mongoose.connect(
    'mongodb://localhost:27017/teste'
  );

  console.log('conectou ao mongoose');
}

main().catch(err => console.log(err));

export { mongoose };
