import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-border/30">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <Dialog>
            <DialogTrigger className="hover:text-foreground transition-colors underline">
              Политика конфиденциальности
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Политика конфиденциальности</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    Используя наш сайт, вы соглашаетесь с обработкой ваших персональных данных.
                  </p>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Какие данные мы собираем:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Имя</li>
                      <li>Дата рождения</li>
                      <li>Номер телефона</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Для чего используются данные:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Для связи с вами и предоставления услуг</li>
                      <li>Для подготовки астрологического анализа</li>
                      <li>Для улучшения качества обслуживания</li>
                    </ul>
                  </div>
                  
                  <p>
                    Мы не передаем ваши данные третьим лицам и обеспечиваем их защиту в соответствии с законодательством РФ.
                  </p>
                  
                  <p>
                    Вы имеете право на доступ, изменение и удаление ваших персональных данных.
                  </p>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
          
          <Dialog>
            <DialogTrigger className="hover:text-foreground transition-colors underline">
              Согласие на обработку данных
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Согласие на обработку персональных данных</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    Заполняя форму на сайте, вы даете согласие на обработку ваших персональных данных.
                  </p>
                  
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Обработка данных включает:</h3>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Сбор и хранение данных</li>
                      <li>Использование для предоставления услуг</li>
                      <li>Связь с вами по указанным контактам</li>
                    </ul>
                  </div>
                  
                  <p>
                    Согласие действует до момента его отзыва. Вы можете отозвать согласие в любой момент, связавшись с нами.
                  </p>
                  
                  <p>
                    Контакт для вопросов: +7 (906) 182 72 29
                  </p>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
        
        <p className="text-xs text-center text-muted-foreground">
          © 2024 Все права защищены
        </p>
      </div>
    </footer>
  );
};

export default Footer;
