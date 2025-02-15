import { IMenuItem } from '.';

import clsx from 'clsx';
import { FC } from 'react';

type PopupMenuItemProps = {
  menuItem: IMenuItem;
  border?: boolean;
  isActive?: boolean;
};

const PopupMenuItem: FC<PopupMenuItemProps> = ({
  menuItem,
  border = false,
  isActive = false,
}) => {
  return (
    <div
      className={clsx(
        {
          'flex px-6 py-3 items-center hover:bg-primary-50 cursor-pointer space-x-3 group':
            true,
        },
        { 'border-b-1 border-b-neutral-200': border },
        { '!cursor-default': menuItem.disabled },
        { 'bg-primary-50': isActive },
        { [menuItem.className || '']: true },
      )}
      data-testid={menuItem.dataTestId}
      role="button"
      tabIndex={0}
    >
      {menuItem.icon && (
        <div className={menuItem.iconWrapperClassName}>
          {menuItem.icon}
        </div>
      )}
      <div
        className={clsx(
          { 'text-sm text-neutral-900 font-medium whitespace-nowrap': true },
          { '!text-neutral-400': menuItem.disabled },
          { [`${menuItem.labelClassName}`]: true },
        )}
      >
        {menuItem.label}
      </div>
    </div>
  );
};

export default PopupMenuItem;
