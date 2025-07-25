import React from "react";
import { FooterLink } from "@/components/elements/footer-link";
import { footerLinks, appGlobal } from "@/constants/constants";

export const Footer = () => {

  return (
    <footer className="bottom-0 w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Logo và thông tin công ty - 2 cột */}
          <div className="md:col-span-2 lg:col-span-2 space-y-4">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-foreground">{appGlobal.name}</h3>
              <p className="text-sm text-foreground">{appGlobal.description}</p>
            </div>
            <div className="space-y-2">
              <h5 className="text-lg font-semibold text-foreground">Liên hệ</h5>
              <div className="text-sm text-foreground space-y-1">
                <p>📍 La Gorta, San Siro, Milano, Italia</p>
                <p>📞 Hotline: 999-9999999</p>
                <p>✉️ Email: info@gorth.org</p>
              </div>
            </div>
          </div>
          
          {/* Các cột thông tin - 4 cột bên phải */}
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-foreground">Payment</h5>
            <ul className="space-y-2">
              {footerLinks.paymentIcons.map((paymentIcon, index) => (
                <li key={index}>
                  <FooterLink 
                    item={paymentIcon} 
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-foreground">Information</h5>
            <ul className="space-y-2">
              {footerLinks.usefulInfo.map((useful, index) => (
                <li key={index}>
                  <FooterLink item={useful} />
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-foreground">Social</h5>
            <ul className="space-y-2">
              {footerLinks.socialIcons.map((socialIcon, index) => (
                <li key={index}>
                  <FooterLink item={socialIcon} />
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="text-lg font-semibold text-foreground">Feedback</h5>
            <p className="text-sm text-foreground leading-relaxed">
              Phản hồi nóng về chất lượng sản phẩm và dịch vụ.
              Đội ngũ Kiểm Soát Chất Lượng của chúng tôi sẵn sàng lắng nghe quý khách.
            </p>
            {/*<Button href="#" variant="secondary" style={{ backgroundColor: '#ff00aa' }}>*/}
            {/*    Gửi phản hồi ngay*/}
            {/*</Button>*/}
            {/* <ResponseButton /> */}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="text-center space-y-2">
            <h5 className="text-base font-medium text-foreground">
              Copyright &copy; 2020 - {(new Date().getFullYear())} Gorth Inc. All rights reserved.
            </h5>
          </div>
        </div>
      </div>
    </footer>
  );
};
