import { createContext } from 'react';
import UserStore from '../interface/UserStore';
import ConversationStore from '../interface/ConversationStore';
import StageStore from '../interface/StageStore';
import TagsStore from '../interface/TagsStore';
import TaskStore from '../interface/TaskStore';

export const userStore = new UserStore();
export const conversationStore = new ConversationStore();
export const stageStore = new StageStore();
export const tagsStore = new TagsStore();
export const taskStore = new TaskStore();

export const StoreContext = createContext();
