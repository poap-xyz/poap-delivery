import styled from '@emotion/styled';

export default styled.input`
  width: 100%;
  height: 50px;
  padding: 12px;
  box-shadow: none;
  border: 2px solid $grayscale3;
  background: $color-invert;
  transition: right 0.2s ease-out;
  border-radius: 4px;
  margin: 0 auto 16px;
  color: $color-primary;

  outline-color: $color-primary;

  &::placeholder {
    color: $color-medium-violet;
  }

  @include x-rem(font-size, 13px);

  @media (min-width: $bp-m) {
    @include x-rem(font-size, 16px);
  }

  &:last-child {
    margin: 0;
  }

  &:focus,
  &:hover {
    border: 2px solid $color-primary;
  }

  &:disabled {
    background: $color-disabled-field;
    border-color: $color-disabled-field;
  }

  &.error {
    border: 2px solid #e13c5d;
  }
`;
