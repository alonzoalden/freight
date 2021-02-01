import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ChatPanelFakeDb } from './chat-panel';
import { ItemFakeDb } from './item';
import { MemberTodoFakeDb } from './member';

export class FakeDbService implements InMemoryDbService
{
    createDb(): any
    {
        return {
            'member'      : MemberTodoFakeDb.current,
            // E-Commerce
            // 'e-commerce-products' : ECommerceFakeDb.products,
            // 'e-commerce-orders'   : ECommerceFakeDb.orders,
            'e-commerce-products' : ItemFakeDb.current,
            'allitemlist' : ItemFakeDb.current,
            // Chat Panel
            'chat-panel-contacts' : ChatPanelFakeDb.contacts,
            'chat-panel-chats': ChatPanelFakeDb.chats,
            'chat-panel-user': ChatPanelFakeDb.user,
        };
    }
}
