interface ICreateRentalDTO {
  car_id: string;
  expected_return_date: Date;
  user_id: string;
  id?: string;
  end_date?: Date;
  total?: number;
}

export { ICreateRentalDTO };
