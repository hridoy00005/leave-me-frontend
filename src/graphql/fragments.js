import gql from "graphql-tag";

export const TEMPLATE_FORM_FRAGMENT = gql`
  fragment FormType on FormType {
    label
    name
    placeholder
    defaultValue
    required
    type
    col
    options {
      value
      label
    }
    required
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserType on UserType {
    _id
    fullname
    email
    role
    status
    company
    phone
  }
`;

export const SITE_FRAGMENT = gql`
  fragment SiteType on SiteType {
    _id
    name
    code
    address
  }
`;

export const GROUP_FRAGMENT = gql`
  fragment GroupType on GroupType {
    _id
    name
  }
`;

export const DROPDOWN_CATEGORY_FRAGMENT = gql`
  fragment DropdownCategoryType on DropdownCategory {
    _id
    name
    position
    active
    restaurant
  }
`;

export const DROPDOWN_FRAGMENT = gql`
  fragment DropdownType on Dropdown {
    _id
    name
    active
    position
    category
  }
`;

export const TABLE_FRAGMENT = gql`
  fragment TableType on Table {
    _id
    name
    active
  }
`;

export const MENU_SCHEDULE_FRAGMENT = gql`
  fragment MenuScheduleType on MenuSchedule {
    _id
    day
    from
    to
    active
    menu
  }
`;

export const TRANSLATION_FRAGMENT = gql`
  fragment TranslationType on Translation {
    lang
    name
    desc
    method
  }
`;

export const MENU_ITEM_FRAGMENT = gql`
  fragment MenuItemType on MenuItem {
    _id
    name
    price
    active
    desc
    position
    translation {
      ...TranslationType
    }
    createdAt
    updatedAt
  }
  ${TRANSLATION_FRAGMENT}
`;

export const EXTRAS_FRAGMENT = gql`
  fragment ExtraType on Extra {
    _id
    name
    price
    active
    position
    category
    allergens
    menuItem {
      ...MenuItemType
    }
  }
  ${MENU_ITEM_FRAGMENT}
`;
export const ALLERGENS_FRAGMENT = gql`
  fragment AllergenType on AllergenType {
    _id
    name
    active
  }
`;
export const EXTRA_CATEGORY_FRAGMENT = gql`
  fragment ExtraCategoryType on ExtraCategory {
    _id
    name
    active
    position
    restaurant
    extras {
      ...ExtraType
    }
  }
  ${EXTRAS_FRAGMENT}
`;

export const SUBCATEGORY_FRAGMENT = gql`
  fragment SubCategoryType on SubCategory {
    _id
    name
    position
    active
    translation {
      ...TranslationType
    }
    items {
      ...MenuItemType
    }
  }
  ${TRANSLATION_FRAGMENT}
  ${MENU_ITEM_FRAGMENT}
`;

export const CATEGORY_FRAGMENT = gql`
  fragment CategoryType on Category {
    _id
    name
    position
    active
    translation {
      ...TranslationType
    }
    items {
      ...MenuItemType
    }
    subcategory {
      ...SubCategoryType
    }
  }

  ${TRANSLATION_FRAGMENT}
  ${MENU_ITEM_FRAGMENT}
  ${SUBCATEGORY_FRAGMENT}
`;

export const MENU_FRAGMENT = gql`
  fragment MenuType on Menu {
    _id
    name
    image
    active
    position
    translation {
      ...TranslationType
    }
    items {
      ...MenuItemType
    }
    category {
      ...CategoryType
    }
    schedule {
      ...MenuScheduleType
    }
  }
  ${MENU_ITEM_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  ${MENU_SCHEDULE_FRAGMENT}
`;

export const STAFF_FRAGMENT = gql`
  fragment StaffType on Staff {
    _id
    firstname
    lastname
    email
    phone
  }
`;

export const ORDER_ITEM_FRAGMENT = gql`
  fragment OrderItemType on OrderItem {
    item {
      ...MenuItemType
    }
    quantity
  }
  ${MENU_ITEM_FRAGMENT}
`;

export const ORDER_FRAGMENT = gql`
  fragment OrderType on Order {
    _id
    createdAt
    updatedAt
    currency
    total
    status
    paymentMethod
    paymentStatus
    restaurant
    note
  }
`;

export const SIZING_ITEM_FRAGMENT = gql`
  fragment SizingItemType on SizingItem {
    _id
    name
    active
    position
    sizing
  }
`;
export const SIZING_FRAGMENT = gql`
  fragment SizingType on Sizing {
    _id
    name
    active
    position
    category
    items {
      ...SizingItemType
    }
  }
  ${SIZING_ITEM_FRAGMENT}
`;
export const SIZING_CATEGORY_FRAGMENT = gql`
  fragment SizingCategoryType on SizingCategory {
    _id
    name
    position
    active
    restaurant
    sizings {
      ...SizingType
    }
  }
  ${SIZING_FRAGMENT}
`;
