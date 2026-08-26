import { BrandMark } from "./BrandMark";

export function SiteFooter() {
  return (
    <footer aria-labelledby="site-footer-title" className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <BrandMark className="site-footer__mark" />
          <div>
            <h2 id="site-footer-title">Точка притяжения</h2>
            <p>Кофейня · бар · галерея · сувениры</p>
          </div>
        </div>

        <nav aria-label="Источники и полезные ссылки" className="site-footer__links">
          <a
            href="https://vk.ru/samaratochkaprityazheniya"
            rel="noreferrer noopener"
            target="_blank"
          >
            Сообщество VK
          </a>
          <a
            href="https://yandex.ru/maps/-/CTDBI0~o"
            rel="noreferrer noopener"
            target="_blank"
          >
            Маршрут в Яндекс Картах
          </a>
        </nav>

        <div className="site-footer__note">
          <p>Факты, меню и наличие уточняйте у команды кафе.</p>
          <small>
            Референсные композиции и сгенерированные изображения отмечены как
            визуальные материалы, не документальные фотографии места.
          </small>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>Самара · ул. Фрунзе, 130</span>
        <span>© 2026 Точка притяжения</span>
      </div>
    </footer>
  );
}
