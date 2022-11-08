interface SanityBody {
  _createdAt: string;
  _id: string;
  _rev: string;
  _updatedAt: string;
}

interface Todo extends SanityBody {
  title: String;
  content: String;
}
